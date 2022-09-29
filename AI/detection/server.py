import base64
import io
import test
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
    with open("temp.png", "wb") as fp:
        fp.write(contents)
    im = Image.open('./temp.png')
    x, y = im.size
    px = im.load()

    for i in range(0, x):
        for j in range(0, y):
            if px[i, j][-1] == 0:
                px[i, j] = (255, 255, 255, 255)
    im = im.convert('RGB')
    im.save('temp.jpg')
    result = test.faster_rcnn("temp.jpg")

    return result