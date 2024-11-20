from typing import Annotated
from fastapi import FastAPI, File, UploadFile, HTTPException
from text_extraction import extract_text_from_pdf
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime


class FeedbackDto(BaseModel):
    file_name: str
    feedback: str

app = FastAPI()

db = {}

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}

@app.post("/files/")
async def create_file(file: Annotated[bytes, File()]):
    return {"file_size": len(file)}

@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile):
    file_content = extract_text_from_pdf(file.file.read())
    # Get the current timestamp
    current_timestamp = datetime.now()
    db[file.filename] = {"filename": file.filename, "file_content": file_content, "feedback_rating": None, "date_uploaded": current_timestamp}
    return db

@app.post("/submit/feedback/")
async def submit_feedback(feedback_dto: FeedbackDto):
     # Check if the file exists in the database
    print(db) 
    if feedback_dto.file_name not in db:
        print("grapes")
        print(db)
        raise HTTPException(status_code=404, detail="File not found")
    
    # Update the feedback rating
    db[feedback_dto.file_name]["feedback_rating"] = feedback_dto.feedback
    return {"message": "Submitted feedback successfully"}

@app.get("/getfiles/")
async def get_files_feedback():
    return db