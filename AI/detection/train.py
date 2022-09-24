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
from imgaug import augmenters as iaa
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
xml_list = os.listdir("/home/jupyter-j7d203/iconimg/Annotations_new")
xml_list.sort()

label_set = set()

for i in range(len(xml_list)):
    xml_path = "/home/jupyter-j7d203/iconimg/Annotations_new/"+str(xml_list[i])
    #   if !os.path.isfile(xml_path):
    #     os.remove("/home/jupyter-j7d203/iconimg/Annotations/new)
    file_name, object_name, bbox = xml_parser(xml_path)

# class 이름 추가
    for name in object_name:
        label_set.add(name)


label_set = sorted(list(label_set))

label_dic = {}
# 클래스에 번호부여
for i, key in enumerate(label_set):
  label_dic[key] = (i+1)
# print(label_dic)

# 이미지/어노테이션 리사이징 및 플립
class Pascal_Voc(Dataset):

    def __init__(self, xml_list, len_data):
        self.xml_list = xml_list
        self.len_data = len_data
        self.to_tensor = transforms.ToTensor()
        self.flip = iaa.Fliplr(0.5)
        self.resize = iaa.Resize({"shorter-side": 1000, "longer-side": "keep-aspect-ratio"})

    def __len__(self):
        return self.len_data

    def __getitem__(self, idx):
        xml_path = "/home/jupyter-j7d203/iconimg/Annotations_new/" + str(xml_list[idx])

        file_name, object_name, bbox = xml_parser(xml_path)

        image_path = "/home/jupyter-j7d203/iconimg/image_new/" + str(file_name)
        image = Image.open(image_path).convert("RGB")

        image = np.array(image)

        image, bbox = self.flip(image=image, bounding_boxes=np.array([bbox]))
        image, bbox = self.resize(image=image, bounding_boxes=bbox)
        bbox = bbox.squeeze(0).tolist()
        image = self.to_tensor(image)

        targets = []
        d = {}
        d['boxes'] = torch.tensor(bbox, device=device)
        d['labels'] = torch.tensor([label_dic[x] for x in object_name], dtype=torch.int64, device=device)
        targets.append(d)

        return image, targets

#데이터 테스트 출력
dataset = Pascal_Voc(xml_list,100)

dataloader = DataLoader(dataset,shuffle=True)

for i, (image, targets) in enumerate(dataloader):
    test_image = image
    test_target = targets
    if i == 0 : break

print(test_target)

labels = test_target[0]['labels'].squeeze_(0)
objects = []
for lb in labels:
    objects.append([k for k, v in label_dic.items() if v == lb][0])

plot_image = makeBox(test_image.squeeze(0).permute(1,2,0).numpy(),test_target[0]['boxes'].squeeze(0),objects)
plt.imshow(plot_image)

