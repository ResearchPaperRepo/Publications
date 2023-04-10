import cloudinary
from cloudinary.uploader import upload
import json


def upload_pdf_to_cloudinary(file_name):
    try:

        f = open('config.json')
        config = json.load(f)
        f.close()

        cloudinary.config(
        cloud_name = config["CLOUD_NAME"],
        api_key = config["CLOUD_API_KEY"],
        api_secret = config["CLOUD_API_SECRET"],
        secure = True
        )

        result = upload(file_name, folder="ResearchPaperRepo", overwrite=True, public_id=file_name)
        
        return result["secure_url"]
    except Exception as e:
        print('An unexpected error happened in cloudinary_upload.py > upload_pdf_to_cloudinary function' + str(e))
        return ""

    return ""






