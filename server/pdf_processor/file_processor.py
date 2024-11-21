import pymupdf

def extract_text_from_pdf(byte_content):
    doc = pymupdf.Document(stream=byte_content)
    string = b''
    for page in doc:
        text = page.get_text().encode("utf8")
        string += text
    return string
