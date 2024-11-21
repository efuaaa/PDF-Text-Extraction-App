from typing import Annotated
from fastapi import File, UploadFile, HTTPException, Request, APIRouter
from datetime import datetime
from pdf_processor.models import FeedbackDto
from pdf_processor.file_processor import extract_text_from_pdf


router = APIRouter(
    prefix="",
    tags=["root"]
)


@router.get("/")
async def root():
    return {"/docs": "OpenAPI Documentation Endpoint"}


@router.post("/uploadfile/")
async def upload_file(file: UploadFile, request: Request):
    database = request.app.state.dependencies.get_database()
    file_content = extract_text_from_pdf(file.file.read())
    current_timestamp = datetime.now()
    database.insert(id=file.filename, entry={"filename": file.filename, "file_content": file_content, "feedback_rating": None, "date_uploaded": current_timestamp})
    return database.get_all_grouping_by_id()


@router.post("/submit/feedback/")
async def submit_feedback(feedback_dto: FeedbackDto, request: Request):
    database = request.app.state.dependencies.get_database()
    if not database.entry_exists(id=feedback_dto.file_name):
        raise HTTPException(status_code=404, detail=f"File '{feedback_dto.file_name}' not found")

    database.update(id=feedback_dto.file_name, updated_fields={"feedback_rating": feedback_dto.feedback})
    return {"message": "Submitted feedback successfully"}


@router.get("/getfiles/")
async def get_files_feedback(request: Request):
    database = request.app.state.dependencies.get_database()
    return database.get_all_grouping_by_id()

