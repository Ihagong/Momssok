import torch  # pytorch
import torch.nn as nn  # pytorch network
from torch.utils.data import Dataset, DataLoader  # pytorch dataset
from torch.utils.tensorboard import SummaryWriter  # tensorboard
import torchvision  # torchvision
import torch.optim as optim  # pytorch optimizer
import numpy as np  # numpy
import matplotlib.pyplot as plt  # matplotlib(이미지 표시를 위해 필요)
from collections import OrderedDict  # python라이브러리 (라벨 dictionary를 만들 때 필요)
import os  # os
import xml.etree.ElementTree as Et  # Pascal xml을 읽어올 때 필요
from xml.etree.ElementTree import Element, ElementTree
import cv2  # opencv (box 그리기를 할 때 필요)
from PIL import Image, ImageDraw, ImageFont  # PILLOW (이미지 읽기)
import time  # time
import imgaug as ia  # imgaug
from imgaug import augmenters as iaa # 이미지 augmentation
from torchvision import transforms  # torchvision transform

# GPU연결
if torch.cuda.is_available():
    device = torch.device('cuda:0')
else:
    device = torch.device('cpu')


# xml 파일 해체
def xml_parser(xml_path):
    xml_path = xml_path

    xml = open(xml_path, "r")
    tree = Et.parse(xml)
    root = tree.getroot()

    size = root.find("size")

    file_name = root.find("filename").text

    object_name = []
    bbox = []

    objects = root.findall("object")
    for _object in objects:
        name = _object.find("name").text
        object_name.append(name)
        bndbox = _object.find("bndbox")
        one_bbox = []
        xmin = bndbox.find("xmin").text
        one_bbox.append(int(float(xmin)))
        ymin = bndbox.find("ymin").text
        one_bbox.append(int(float(ymin)))

        xmax = bndbox.find("xmax").text
        one_bbox.append(int(float(xmax)))
        ymax = bndbox.find("ymax").text
        one_bbox.append(int(float(ymax)))
        if one_bbox[0] == one_bbox[2]:
            one_bbox[2] += 1
        if one_bbox[1] == one_bbox[3]:
            one_bbox[3] += 1

        bbox.append(one_bbox)

    return file_name, object_name, bbox


# 박스 비주얼라이징
def makeBox(voc_im, bbox, objects):
    image = voc_im.copy()
    for i in range(len(objects)):
        cv2.rectangle(image, (int(bbox[i][0]), int(bbox[i][1])), (int(bbox[i][2]), int(bbox[i][3])), color=(0, 255, 0),
                      thickness=1)
        cv2.putText(image, objects[i], (int(bbox[i][0]), int(bbox[i][1]) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.8,
                    (0, 255, 0), 2)  # 크기, 색, 굵기
    return image

# xml리스트 불러오기
"""
데이터셋은 현재 깃에 없기 때문에
GPU서버 기준으로 경로 작성
"""
xml_list = os.listdir("/home/jupyter-j7d203/iconimg/Annotations_new")
xml_list.sort()

label_set = set()

for i in range(len(xml_list)):
    xml_path = "/home/jupyter-j7d203/iconimg/Annotations_new/"+str(xml_list[i])
    #   if !os.path.isfile(xml_path):
    #     os.remove("/home/jupyter-j7d203/iconimg/Annotations/new)
    file_name, object_name, bbox = xml_parser(xml_path) # xml파일 해체

# class 이름 추가
    for name in object_name:
        label_set.add(name)


label_set = sorted(list(label_set))

label_dic = {}
# 클래스에 번호부여
for i, key in enumerate(label_set):
  label_dic[key] = (i+1)
# print(label_dic)

# 이미지/박스 리사이징
class Pascal_Voc(Dataset):

    def __init__(self, xml_list, len_data):
        # 어노테이션 리스트
        self.xml_list = xml_list
        # 데이터 길이
        self.len_data = len_data
        # 텐서화 함수정의
        self.to_tensor = transforms.ToTensor()
        # 가로로 flip(뒤집기)
        self.flip = iaa.Fliplr(0.0)
        # 비율을 유지하면서 가장 짧은 쪽을 1000으로 리사이징
        self.resize = iaa.Resize({"shorter-side": 1000, "longer-side": "keep-aspect-ratio"})

    def __len__(self):
        return self.len_data

    def __getitem__(self, idx):
        xml_path = "/home/jupyter-j7d203/iconimg/Annotations_new/" + str(xml_list[idx])

        file_name, object_name, bbox = xml_parser(xml_path) # xml파일 해체


        """
        xml파일에서 파싱한 filename으로 이미지 경로를 찾음
        RGB로 convert한 후 넘파이 배열화
        
        현재 모델에서 사용된 train 이미지셋은 모두 jpg파일이라 convert할 필요가 없으나
        추후 png파일이 추가될 수 있기때문에 convert를 붙여주겠음
        """
        image_path = "/home/jupyter-j7d203/iconimg/image_new/" + str(file_name)
        image = Image.open(image_path).convert("RGB")
        image = np.array(image)


        """
        바운딩박스 넘파이 배열화 후
        리스트로 바꿔줌
        이미지는 텐서화
        """
        image, bbox = self.flip(image=image, bounding_boxes=np.array([bbox]))
        image, bbox = self.resize(image=image, bounding_boxes=bbox)
        bbox = bbox.squeeze(0).tolist()
        image = self.to_tensor(image)

        targets = []
        d = {}

        """
        박스 좌표와 라벨 반환
        """
        d['boxes'] = torch.tensor(bbox, device=device)
        d['labels'] = torch.tensor([label_dic[x] for x in object_name], dtype=torch.int64, device=device)
        targets.append(d)

        return image, targets

# 데이터 테스트 출력
# 랜덤으로 100개만출력
dataset = Pascal_Voc(xml_list,100)
dataloader = DataLoader(dataset,shuffle=True)

# 한개만 출력해서 시각화
for i, (image, targets) in enumerate(dataloader):
    test_image = image
    test_target = targets
    if i == 0 : break

print(test_target)

"""
라벨 번호를 라벨명으로 바꿈
"""
labels = test_target[0]['labels'].squeeze_(0)
objects = []
for lb in labels:
    objects.append([k for k, v in label_dic.items() if v == lb][0])

plot_image = makeBox(test_image.squeeze(0).permute(1,2,0).numpy(),test_target[0]['boxes'].squeeze(0),objects)
# 가로 세로 격자 사이즈와 함께 출력
plt.imshow(plot_image)

