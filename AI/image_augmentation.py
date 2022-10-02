import torch
import imgaug as ia     #imgaug
import torchvision      #torchvision
from imgaug import augmenters as iaa
from torch.utils.data import Dataset, DataLoader
import xml.etree.ElementTree as Et      #Pascal xml을 읽어올 때 필요
from xml.etree.ElementTree import Element, ElementTree
from torchvision import transforms      #torchvision transform
from PIL import Image, ImageDraw, ImageFont    #PILLOW (이미지 읽기)
import numpy as np      #numpy
import matplotlib.pyplot as plt     #matplotlib(이미지 표시를 위해 필요)
from collections import OrderedDict     #python라이브러리 (라벨 dictionary를 만들 때 필요)
from xml.etree.ElementTree import Element, SubElement, ElementTree
import cv2

#GPU연결
if torch.cuda.is_available():
  device = torch.device('cuda:0')
else:
  device = torch.device('cpu')
print(device)


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


def makeBox(voc_im, bbox, objects):
    font = ImageFont.truetype("KOTRA HOPE.ttf", 70)
    font_bg = ImageFont.truetype("KOTRA HOPE.ttf", 70)
    image = voc_im.copy() * 255

    #   img = Image.open(image).convert('RGB')
    #   Image.fromarray((img * 1).astype(np.uint8)).convert('RGB')
    image = image.astype(np.uint8)
    image = Image.fromarray(image)
    draw = ImageDraw.Draw(image, 'RGBA')

    for i in range(len(objects)):
        #     cv2.rectangle(image,(int(bbox[i][0]),int(bbox[i][1])),(int(bbox[i][2]),int(bbox[i][3])),color = (255,0,255),thickness = 6)
        draw.rectangle((int(bbox[i][0]), int(bbox[i][1]), int(bbox[i][2]), int(bbox[i][3])), outline=(255, 255, 0, 255),
                       fill=(255, 255, 0, 50), width=6)
        text = objects[i]
        draw.text((int(bbox[i][0] + 5), int(bbox[i][1]) - 5), text, color=(0, 0, 0), font=font_bg, fill=(255, 255, 230))
        draw.text((int(bbox[i][0]), int(bbox[i][1]) - 10), text, color=(0, 0, 0), font=font, fill=(230, 0, 230))

    #     cv2.putText(image, objects[i], (int(bbox[i][0]), int(bbox[i][1])-10), cv2.FONT_HERSHEY_SCRIPT_SIMPLEX, 2, (255,0,255), 6) # 크기, 색, 굵기
    return image


class Pascal_Voc(Dataset):

    def __init__(self, xml_list, len_data):

        self.xml_list = xml_list
        self.len_data = len_data
        self.to_tensor = transforms.ToTensor()
        self.flip = iaa.Fliplr(0.0)
        self.affine = iaa.PiecewiseAffine(scale=(0.01, 0.05))
        #     self.channel_shuffle = iaa.ChannelShuffle(1.0)
        #     self.affine = iaa.PiecewiseAffine(0.05)
        #     self.blur = iaa.GaussianBlur(sigma=(0, 1.5))
        self.resize = iaa.Resize({"shorter-side": 1000, "longer-side": "keep-aspect-ratio"})

    def __len__(self):
        return self.len_data

    def __getitem__(self, idx):

        xml_path = str(xml_list[idx])

        file_name, object_name, bbox = xml_parser(xml_path)
        if '.jpg' in file_name:
            image_path = "/home/jupyter-j7d203/drawing_test/images/" + str(file_name)
        else:
            image_path = "/home/jupyter-j7d203/drawing_test/images/" + str(file_name) + '.jpg'
        image = Image.open(image_path).convert("RGB")
        image = np.array(image)
        #     image = self.channel_shuffle(image=image)
        image, bbox = self.flip(image=image, bounding_boxes=np.array([bbox]))
        #     image= self.blur(image = image)
        image, bbox = self.resize(image=image, bounding_boxes=bbox)
        image, bbox = self.affine(image=image, bounding_boxes=bbox)
        #     image, bbox = self.resize(image = image,bounding_boxes = bbox)
        bbox = bbox.squeeze(0).tolist()
        image = self.to_tensor(image)

        targets = []
        d = {}
        d['boxes'] = torch.tensor(bbox, device=device)
        d['labels'] = torch.tensor([label_dic[x] for x in object_name], dtype=torch.int64, device=device)
        targets.append(d)

        return file_name, image, targets

import glob
import os


xml_list = glob.glob('/home/jupyter-j7d203/drawing_test/labels/**/*.xml', recursive = True)

label_set = set()
d = {'airplane': 0, 'animal': 0, 'bird': 0, 'building': 0, 'car': 0, 'cat': 0, 'cloud': 0, 'dog': 0, 'elephant': 0, 'fish': 0, 'flower': 0, 'fruit': 0, 'heart': 0, 'moon': 0, 'person': 0, 'play': 0, 'rainbow': 0, 'roket': 0, 'star': 0, 'sun': 0, 'tree': 0}
total = 0
for i in range(len(xml_list)):
  xml_path = str(xml_list[i])
  total += 1
  file_name, object_name, bbox = xml_parser(xml_path)
  for name in object_name:
    label_set.add(name)
    d[name] = d.get(name, 0)+1
    if name == 'cloudw':
        os.remove(xml_path)
  if [1,1,1,1] in bbox:
    delete_set.add(file_name)

label_set = sorted(list(label_set))

label_dic = {}
for i, key in enumerate(label_set):
  label_dic[key] = (i+1)
print('total: ', total)
print(label_dic)
print(d)

def make_xml(file_name, i, d, h, w, s):
    # pascal voc 형식 맞추기

    root = Element("annotation")
#     element1 = Element("cmplaces_id")
#     element1.text = str(data["abstract_image"]["abs_no"])
#     root.append(element1)

    element2 = Element("filename")
    element2.text = 'ffine'+str(i)+'.jpg'
    root.append(element2)

    element3 = Element("size")

    sub_element1 = SubElement(element3, "width")
    sub_element1.text = str(w)

    sub_element2 = SubElement(element3, "height")
    sub_element2.text = str(h)

    sub_element3 = SubElement(element3, "depth")
    sub_element3.text = "3"

    root.append(element3)
    print(d)
    for class_name in d:
        for bbox in d[class_name]:
            element4 = Element("object")
            root.append(element4)

            sub_element4 = SubElement(element4, "name")
            sub_element4.text = class_name

            sub_element5 = SubElement(element4, "pose")
            sub_element5.text = "Unspecified"

            sub_element6 = SubElement(element4, "truncated")
            sub_element6.text = "0"

            sub_element7 = SubElement(element4, "difficult")
            sub_element7.text = "0"

            sub_element8 = SubElement(element4, "bndbox")

            sub_sub_element1 = SubElement(sub_element8, "xmin")
            sub_sub_element1.text = str(bbox[0])

            sub_sub_element2 = SubElement(sub_element8, "ymin")
            sub_sub_element2.text = str(bbox[1])

            sub_sub_element3 = SubElement(sub_element8, "xmax")
            sub_sub_element3.text = str(bbox[2])

            sub_sub_element4 = SubElement(sub_element8, "ymax")
            sub_sub_element4.text = str(bbox[3])


    tree = ElementTree(root)

    fileName = "ffine"+str(i)+".xml"
    with open("aug_xml/"+fileName, "wb") as new_file:
        tree.write(new_file, encoding='utf-8', xml_declaration=True)


dataset = Pascal_Voc(xml_list, len(xml_list))
dataloader = DataLoader(dataset, shuffle=True)

for i, (file_name, image, targets) in enumerate(dataloader):
    #     if i==1:
    #         break
    test_image = image
    test_target = targets

    labels = test_target[0]['labels'].squeeze_(0)
    objects = []
    d = dict()
    for lb in labels:
        objects.append([k for k, v in label_dic.items() if v == lb][0])
    #     if ('person' in objects) or ('flower' in objects) or ('cloud' in objects) or ('animal' in objects):
    #         print('hi')
    #         continue
    voc_im = test_image.squeeze(0).permute(1, 2, 0).numpy()
    image = voc_im.copy()
    h, w, c = image.shape
    #     plt.imshow(image)
    #     plt.show()
    bbox = test_target[0]['boxes'].squeeze(0)
    for j in range(len(objects)):
        if objects[j] not in d:
            d[objects[j]] = []
        d[objects[j]].append([int(bbox[j][0]), int(bbox[j][1]), int(bbox[j][2]), int(bbox[j][3])])
    #         print(objects[j])
    #         print(int(bbox[j][0]),int(bbox[j][1]),int(bbox[j][2]),int(bbox[j][3]))
    make_xml(file_name[0], i, d, h, w, c)
    cv2.imwrite('aug_image/' + "ffine" + str(i) + '.jpg', image * 255)
#     plt.savefig()


# plot_image = makeBox(test_image.squeeze(0).permute(1,2,0).numpy(),test_target[0]['boxes'].squeeze(0),objects)
# plt.imshow(plot_image)
# plt.show()
# print(test_image)
# print(test_target)