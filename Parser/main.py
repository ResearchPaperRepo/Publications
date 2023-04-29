import sys
from PDFParser import PDFParser

if __name__ == '__main__':
    pdfFilePath = sys.argv[1].strip()
    PDFParser(pdfFilePath)
    sys.stdout.flush()