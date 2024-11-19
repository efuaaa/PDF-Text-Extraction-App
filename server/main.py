from fastapi import FastAPI
from typing import Annotated
from fastapi import FastAPI, File, UploadFile
from text_extraction import extract_text_from_pdf

app = FastAPI()


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
    return {"filename": file.filename, "file_content": file_content, "feedback_rating": None}
