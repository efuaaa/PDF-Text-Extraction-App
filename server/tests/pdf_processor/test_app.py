import pytest
from fastapi.testclient import TestClient
from fastapi import HTTPException, FastAPI
from datetime import datetime
from unittest.mock import MagicMock, patch, ANY
from server.pdf_processor.models import FeedbackDto
from server.pdf_processor.file_processor import extract_text_from_pdf
from server.pdf_processor.app import router

# Mock the extract_text_from_pdf function to avoid processing actual PDF files
@pytest.fixture
def mock_extract_text_from_pdf(monkeypatch):
    def mock_extract(text):
        return "Extracted content"
    monkeypatch.setattr("server.pdf_processor.app.extract_text_from_pdf", mock_extract)

# Fixture for the FastAPI client and app
@pytest.fixture
def client():
    app = FastAPI()
    app.include_router(router)
    return TestClient(app)

# Mock database dependency
@pytest.fixture
def mock_database():
    mock_db = MagicMock()
    mock_db.get_all_grouping_by_id.return_value = []
    mock_db.insert.return_value = None
    mock_db.entry_exists.return_value = True
    mock_db.update.return_value = None
    return mock_db

# Test for the root endpoint
def test_root(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"/docs": "OpenAPI Documentation Endpoint"}

# Test for upload_file endpoint
def test_upload_file(client, mock_database, mock_extract_text_from_pdf):
    file_data = b"fake_pdf_content"
    mock_database.get_all_grouping_by_id.return_value = [{"filename": "file1.pdf", "file_content": "Extracted content", "feedback_rating": None, "date_uploaded": datetime.now()}]

    # Mock the request app state dependency injection
    client.app.state.dependencies = MagicMock()
    client.app.state.dependencies.get_database = MagicMock(return_value=mock_database)

    response = client.post("/uploadfile/", files={"file": ("file1.pdf", file_data, "application/pdf")})

    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["filename"] == "file1.pdf"

    mock_database.insert.assert_called_once_with(
        id="file1.pdf",
        entry={"filename": "file1.pdf", "file_content": "Extracted content", "feedback_rating": None, "date_uploaded": ANY}
    )

    # Ensure get_all_grouping_by_id was called to return the files list
    mock_database.get_all_grouping_by_id.assert_called_once()

# Test for submit_feedback endpoint
def test_submit_feedback(client, mock_database):
    feedback_data = FeedbackDto(file_name="file1.pdf", feedback="thumbs up")
    mock_database.entry_exists.return_value = True

    # Mock the request app state dependency injection
    client.app.state.dependencies = MagicMock()
    client.app.state.dependencies.get_database = MagicMock(return_value=mock_database)

    response = client.post("/submit/feedback/", json=feedback_data.dict())

    assert response.status_code == 200
    assert response.json() == {"message": "Submitted feedback successfully"}

    mock_database.update.assert_called_once_with(
        id="file1.pdf",
        updated_fields={"feedback_rating": "thumbs up"}
    )


# Test for submit_feedback with file not found
def test_submit_feedback_file_not_found(client, mock_database):
    feedback_data = FeedbackDto(file_name="file_not_found.pdf", feedback="thumbs up")
    mock_database.entry_exists.return_value = False

    # Mock the request app state dependency injection
    client.app.state.dependencies = MagicMock()
    client.app.state.dependencies.get_database = MagicMock(return_value=mock_database)

    response = client.post("/submit/feedback/", json=feedback_data.dict())

    assert response.status_code == 404
    assert response.json() == {"detail": "File 'file_not_found.pdf' not found"}

    mock_database.entry_exists.assert_called_once_with(id="file_not_found.pdf")

# Test for get_files_feedback endpoint
def test_get_files_feedback(client, mock_database):
    mock_database.get_all_grouping_by_id.return_value = [
        {"filename": "file1.pdf", "file_content": "content", "feedback_rating": 5, "date_uploaded": datetime.now()}
    ]

    # Mock the request app state dependency injection
    client.app.state.dependencies = MagicMock()
    client.app.state.dependencies.get_database = MagicMock(return_value=mock_database)

    response = client.get("/getfiles/")

    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["filename"] == "file1.pdf"
    assert response.json()[0]["feedback_rating"] == 5

    mock_database.get_all_grouping_by_id.assert_called_once()
