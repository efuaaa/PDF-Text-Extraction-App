from server.pdf_processor.file_processor import extract_text_from_pdf
import os

def test_that_text_is_extracted_from_pdf():
    with open("./tests/pdf_processor/test_pdf.pdf", "rb") as sample_pdf:
        extracted_text = extract_text_from_pdf(sample_pdf.read())
    assert extracted_text == b"Simple pdf file that contains a single line of text\n"
