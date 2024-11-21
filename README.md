# Extract Text from PDF Application

### Overview

The Extract Text from PDF Application is a web-based tool that allows users to upload PDF files, extract their text content, review the extracted data, and submit feedback on the quality of the extraction logic. This feedback helps improve the text extraction process and ensures higher accuracy in future extractions.

### Features

- Upload PDFs: Users can upload PDF files directly through the web interface.
- Text Extraction: The application extracts text content from the uploaded PDF using a robust extraction logic.
- Review Content: Users can review the extracted text to ensure its accuracy.
- Submit Feedback: Users can provide a "thumbs up" or "thumbs down" rating based on the accuracy of the extracted text.
- Feedback Storage: Feedback is submitted to the backend to improve future extractions.

## Technologies Used

### Frontend
**React**: For the user interface and dynamic rendering.
**Axios**: For handling HTTP requests to the backend.
**CSS**: For responsive and user-friendly styling.

### Backend
**FastAPI**: For handling API requests and managing text extraction logic.
**Python**: For implementing text extraction algorithms and handling feedback submissions.

## Getting Started

**Prerequisites**
_Ensure you have the following installed_:

- Node.js (for running the frontend)
- Python (for the backend)
- pip (for managing Python dependencies)


## Installation
- Clone the repository:

```
https://github.com/your-username/PDF-Text-Extraction-App.git
cd PDF-Text-Extraction-App
```

- Set up the Frontend:
```
cd client
npm install
npm start
```
_This will start the React application at http://localhost:3000._

- Set up the Backend:
To run the application, you change directory so you are in the server folder. Then you can run:
```
cd server
pip install -r requirements.txt
fastapi run --port 8000 server.py ⁠
```
_This will start the FastAPI server at http://127.0.0.1:8000._ OR http://0.0.0.0:8000 

To run the tests you can run the command ⁠ ```pytest tests``` ⁠ from the same directory

#### Usage
- Navigate to the frontend application (http://localhost:3000).
- Upload a PDF file using the "Upload File" button.
- Review the extracted text displayed in the modal.
- Provide feedback by clicking Thumbs Up or Thumbs Down based on the extraction accuracy.
- Feedback is sent to the backend for processing and storage.

### File Structure

```

pdf-text-extraction-app/
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/    # React components (e.g., ModalView)
│   │   ├── assets/        # Images and styles
│   │   ├── App.tsx        # Main application entry point
│   │   └── index.tsx      # React DOM rendering
├── backend/           # FastAPI backend
│   ├── main.py            # Backend API logic
│   ├── models.py          # Database models (if applicable)
│   └── requirements.txt   # Python dependencies
└── README.md          # Project documentation

```

### API Endpoints

1. **Upload File**

- Endpoint: POST /uploadFile
- Description: Uploads a PDF file and extracts its text.
- Request Body: multipart/form-data with file field.
- Response:
```
{
  "file_name": "example.pdf",
  "file_content": "Extracted text from the PDF."
  "feedback_rating": "thumbs up"
  "date_uploaded": "2024-11-20T16:08:38.638291"
}
```
2. **Submit Feedback**

- Endpoint: POST /submit/feedback/
- Description: Submits feedback for a specific file.

3. **Get List of Files**

- Endpoint: GET /getfiles/
- Description: Get List of all submitted files.

```
Response:
{
  "example.pdf": {
    "file_name": "example.pdf",
    "file_content": "Extracted text from the PDF."
    "feedback_rating": "thumbs up"
    "date_uploaded": "2024-11-20T16:08:38.638291"
  }
}
```
### Contributing

- Fork the repository.
- Create a new feature branch:
```
git checkout -b feature-name
```
- Commit your changes:
```
git commit -m "Add feature-name"

```
- Push to the branch:
```
git push origin feature-name
```
- Open a pull request.
  
### Future Improvements

1. Text Highlighting: Allow users to highlight mismatched or incorrect text.
2. Intelligent Text Extraction: Leverage the use of AI models to extract text.
3. Advanced Feedback: Provide options for detailed feedback beyond thumbs up/down.

##### License

_info - This project is licensed under the MIT License._

##### Contact

For inquiries or support, please contact plangette19@gmail.com.
