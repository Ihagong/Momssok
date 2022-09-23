#!/usr/bin/env python
# coding: utf-8

# In[ ]:


from flask import Flask
import os
import PIL
import clip
import torch
import random
import imageio
import numpy as np
from io import BytesIO
from tqdm import tqdm
from glob import glob
from PIL import Image
import matplotlib.pyplot as plt
import requests
import torchvision
from torch.utils.data import DataLoader
from torchvision.datasets import CIFAR100
import torchvision.transforms.functional as TF
from torch.nn import CosineSimilarity as CosSim
from flask import request,make_response,send_file,jsonify
import cv2
import io
import base64
device = "cuda" if torch.cuda.is_available() else "cpu"

# GPU 메모리 약 1.5 GB 필요 --> 만일 부족하다면 clip.available_models() 명령어를 통해 가지고 오는 모델을 바꿀 수 있습니다
model, preprocess = clip.load("ViT-B/32", device=device)

app = Flask(__name__)

count=1
@app.route('/')
def hello_world():
    return 'Hello World!'
@app.route('/count')
def hello_count():
    print(count)
    return 'Hello World!'+str(count)
@app.route('/imgtest', methods=['POST'])
def imgtest():
    #스프링부트에서 전송한 파일 변수에 저장
    f=request.files['file']
    img=Image.open(f)
  
    #이미지 표시
    plt.figure(figsize=(4,4))
    plt.title(f"Input Image")
    plt.imshow(img)
    plt.show()
    
    #이미지를 edge detection 적용하여 변환하는 부분
    # 이미지 로드
    image_gray = np.array(img)
    # 픽셀 강도의 중간값을 계산
    median_intensity = np.median(image_gray)
    # 중간 픽셀 강도에서 위아래 1 표준편차 떨어진 값을 임곗값으로 지정
    lower_threshold = int(max(0, (1.0 - 0.33) * median_intensity))
    upper_threshold = int(min(255, (1.0 + 0.33) * median_intensity))
    # Canny edge detection 적용
    image_canny = cv2.Canny(image_gray, lower_threshold, upper_threshold)

    #변환한 이미지 표시
    plt.figure(figsize=(4,4))
    plt.title(f"Output Image")
    plt.imshow(image_canny, cmap='gray')
    plt.show()
    
    
    # 이미지와 텍스트를 벡터로 만들고 유사도와 확률값을 구합니다.
    image = preprocess(img).unsqueeze(0).to(device) 
    text_dataset = ["tree","a photo of tree","a cat","a flower","a drawing of a tree"]
    text = clip.tokenize(text_dataset).to(device) 
    with torch.no_grad():
        logits_per_image, _ = model(image, text)
        probs = logits_per_image.softmax(dim=-1).cpu().numpy().flatten()

    #일치할 확률 returntext로 저장
    returntext=""
    print("\n- 각 Text가 image와 일치할 확률 -")
    for i in range(len(text_dataset)):
        print("  "+text_dataset[i] + ":", round(probs[i]*100, 3) , "%")
        returntext+="  "+str(text_dataset[i]) + ":"+ str(round(probs[i]*100, 3)) + "%\n"
        
    
    #변수에 있는 이미지를 base64로 인코딩
    img_byte_arr = io.BytesIO()
    Image.fromarray(image_canny).save(img_byte_arr, format='JPEG')
    my_encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    
    #결과(이미지, 확률 계산값)를 json으로 변환하여 반환
    return jsonify(
        img=my_encoded_img,
        text=returntext,
    )

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5002')


# In[ ]:




