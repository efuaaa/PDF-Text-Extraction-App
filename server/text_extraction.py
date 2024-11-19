import pymupdf

pdf_file_path = "/Users/ewurafuaplange/PycharmProjects/fastApiProject/resources/assignment.pdf"

def extract_text_from_pdf(byte_content):

    # doc = pymupdf.open(file)  # open a document
    doc = pymupdf.Document(stream=byte_content)
    # out = open("output.txt", "wb")  # create a text output
    string = b''
    for page in doc:  # iterate the document pages
        text = page.get_text().encode("utf8")
        string += text
    return string

def main():
    print("printed file")
    extract_text_from_pdf(pdf_file_path)




if __name__ == "__main__":
  main()
