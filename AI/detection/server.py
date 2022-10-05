import base64
import io
import test
from PIL import Image

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
    # 가로세로 픽셀사이즈 load
    x, y = im.size
    px = im.load()
    """
    배경이 (0,0,0,0)이면 RGB로 convert했을 때
    검은색으로 보이기 때문에
    보다 높은 정확도를 위해 흰색으로 변경해줌
    """
    for i in range(0, x):
        for j in range(0, y):
            if px[i, j][3] == 0:
                px[i, j] = (255, 255, 255, 255)
    im.save('temp2.png')
    # 태그를 받아옴
    result = test.faster_rcnn("temp2.png")

    return result