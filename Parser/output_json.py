import json
import re
from cloudinary_upload import upload_pdf_to_cloudinary

def identify_title(file_path):
    try:
        file_name_keys = file_path.split("/")[-1].split('.')[0].split("_")
        with open(file_path, "r", errors="ignore") as read_file:
            json_file = json.load(read_file)
            for page_num, page_data in json_file.items():
                for para_num, para_data in enumerate(page_data):
                    for line_num, line_data in enumerate(para_data):
                        if all([word in line_data['text'] for word in file_name_keys]):
                            return line_data['text']
                
                return " ".join()
    except Exception as e:
        print('An unexpected error happened in output_json.py > identify_title function' + str(e))
        return ""

def merge_similar_lines_in_sequence(file_path):

    try:
        with open(file_path, "r", errors="ignore") as read_file:
            json_file = json.load(read_file)
            newJsonFile = {}
            pages_data = []
            for page_num, page_data in json_file.items():
                newPage = []
                for para_num, para_data in enumerate(page_data):
                    newParagraph = []
                    prev_font_size = 0
                    prev_font_bold = False
                    prev_text = ''
                    for line_num, line_data in enumerate(para_data):
                        font_size = line_data['font_size']
                        font_bold = line_data['bold']
                        text = line_data['text']

                        if (prev_font_size == font_size and prev_font_bold == font_bold):
                            prev_text += " " + text
                            
                        else:
                            if (prev_text and prev_font_size != 0):
                                newLine = {}
                                newLine['font_size'] = prev_font_size
                                newLine['bold'] = prev_font_bold
                                newLine['text'] = prev_text
                                newParagraph.append(newLine)
                            prev_font_bold, prev_font_size, prev_text = font_bold, font_size, text
                    newLine = {}
                    newLine['font_size'] = prev_font_size
                    newLine['bold'] = prev_font_bold
                    newLine['text'] = prev_text.strip()
                    newParagraph.append(newLine)
                    newPage.append(newParagraph)
                newJsonFile[page_num] = newPage
                # pages_data.append(newPage)
            # newJsonFile['pages'] = pages_data
            return newJsonFile
    except Exception as e:
        print('An unexpected error happened in output_json.py > merge_similar_lines_in_sequence function' + str(e))
        return {}


def convert_pages_from_json_to_array(json_file):
    try:
        newJson = {}
        newJson['pages'] = []
        page_no = 1
        for k, v in json_file.items():
            newJson['pages'].append(json_file[f'page_{page_no}'])
            page_no += 1
        return newJson
    except Exception as e:
        print('An unexpected error happened in output_json.py > convert_pages_from_json_to_array function' + str(e))
        return {}
    

def identify_authors(Json):
    authors = []
    authors_text = ""
    try:
        for page_no, page_data in enumerate(Json["pages"]):
            for para_no, para_data in enumerate(page_data):
                for line_no, line_data in enumerate(para_data):
                    text = line_data["text"].lower()
                    if "author" in text:
                        authors_match = re.compile(r'author (.*)').search(text)
                        if authors_match:
                            authors.append(authors_match.group(1))
                    if "authors" in text:
                        authors_match = re.compile(r'authors (.*)').search(text)
                        if authors_match:
                            authors.append(authors_match.group(1))
            break
        return authors
    except Exception as e:
        print('An unexpected error happened in output_json.py > identify_authors function' + str(e))
        return authors



def identify_keywords(Json):
    keywords = []
    words_text = ""
    try:
        for page_no, page_data in enumerate(Json["pages"]):
            for para_no, para_data in enumerate(page_data):
                for line_no, line_data in enumerate(para_data):
                    text = line_data["text"].lower()
                    if "keyword" in text:
                        words_match = re.compile(r'keyword (.*)').search(text)
                        if words_match:
                            if ", " in words_match.group(1):
                                keywords.extend(words_match.group(1).split(", "))
                            elif " · " in words_match.group(1):
                                keywords.extend(words_match.group(1).split(" · "))
                        
                    if "keywords" in text:
                        words_match = re.compile(r'keywords (.*)').search(text)
                        if words_match:
                            if ", " in words_match.group(1):
                                keywords.extend(words_match.group(1).split(", "))
                            elif " · " in words_match.group(1):
                                keywords.extend(words_match.group(1).split(" · "))
            break
        return keywords
    except Exception as e:
        print('An unexpected error happened in output_json.py > identify_keywords function' + str(e))
        return keywords


def identify_abstract(Json):
    abstract = ""
    try:
        for page_no, page_data in enumerate(Json["pages"]):
            for para_no, para_data in enumerate(page_data):
                for line_no, line_data in enumerate(para_data):
                    text = line_data["text"].lower()
                    if (len(text.split(" ")) > 50):
                        abstract = text
                        return abstract
            break

        return abstract
    except Exception as e:
        print('An unexpected error happened in output_json.py > identify_abstract function' + str(e))
        return abstract



def output_json_data(json_file_path):
    try:
        newJSONFilePath = json_file_path[:-5] + "_output" + ".json"
        newPDFFilePath = json_file_path.split("/")[-1][:-5] + ".pdf"

        newJson = merge_similar_lines_in_sequence(json_file_path)
        newJson = convert_pages_from_json_to_array(newJson)
        newJson["authors"] = identify_authors(newJson)
        newJson["keywords"] = identify_keywords(newJson)
        newJson["abstract"] = identify_abstract(newJson)
        newJson["file_name"] = json_file_path.split("/")[-1]
        newJson["title"] = identify_title(json_file_path)
        newJson["image"] = "https://accessibility.huit.harvard.edu/sites/hwpi.harvard.edu/files/styles/os_files_large/public/online-accessibility-huit/files/symbols-document-conversion_-_docs.png?m=1670263149&itok=OxIL9JXZ"
        newJson["pdf_link"] = upload_pdf_to_cloudinary(newPDFFilePath)
        
        with open(newJSONFilePath, 'w', encoding='utf-8') as jp:
            json.dump(newJson, jp, ensure_ascii=True, indent=4)
        
        print("------------------- file_name_keysstage 3 -------------------------\n")
        print("Merged Json successfully from sparse to dense format \n")
    except Exception as e:
        print('An unexpected error happened in output_json.py > output_json_data function ' + str(e))