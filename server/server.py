from typing import Annotated
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from server.pdf_processor.app import router as pdf_processor_router
from server.dependencies import Dependencies

dependencies = Dependencies()
app = FastAPI()
app.state.dependencies = dependencies

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

app.include_router(pdf_processor_router)

