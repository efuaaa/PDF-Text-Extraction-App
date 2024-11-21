from pydantic import BaseModel


class FeedbackDto(BaseModel):
    file_name: str
    feedback: str
