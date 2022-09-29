import base64
import io
import test
import json
from PIL import Image
import matplotlib.pyplot as plt
import matplotlib.image as img


from typing import Optional

from fastapi import FastAPI, UploadFile

app = FastAPI()

def from_image_to_bytes(img):
    """
    pillow image 객체를 bytes로 변환
    """
    # Pillow 이미지 객체를 Bytes로 변환
    imgByteArr = io.BytesIO()
    img.save(imgByteArr, format=img.format)
    imgByteArr = imgByteArr.getvalue()
    # Base64로 Bytes를 인코딩
    encoded = base64.b64encode(imgByteArr)
    # Base64로 ascii로 디코딩
    decoded = encoded.decode('ascii')
    return decoded

@app.post("/tag")
async def upload_photo(file: UploadFile):
    contents = await file.read()
    with open("temp.jpg", "wb") as fp:
        fp.write(contents)
    result = test.faster_rcnn("temp.jpg")

    return json.dumps(result)
