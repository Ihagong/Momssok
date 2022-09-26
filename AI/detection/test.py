import torch      #pytorch
import torchvision      #torchvision
import numpy as np      #numpy
from PIL import Image

import faster_rcnn_model


def faster_rcnn(image):
    # GPU연결
    if torch.cuda.is_available():
        device = torch.device('cuda:0')
    else:
        device = torch.device('cpu')
    print(device)


    label_dic = {'airplane': 1, 'animal': 2, 'bird': 3, 'boat': 4, 'building': 5, 'car': 6, 'cat': 7, 'cloud': 8, 'dog': 9,
     'elephant': 10, 'fish': 11, 'flower': 12, 'fruit': 13, 'heart': 14, 'moon': 15, 'person': 16, 'play': 17,
     'rainbow': 18, 'roket': 19, 'star': 20, 'sun': 21, 'tree': 22}

    model = faster_rcnn_model.faster_rcnn()


    model.to(device)
    saved_checkpoint = torch.load("Epoch33.pth", map_location=device)
    model.load_state_dict(saved_checkpoint, strict=False)  # 훈련파일
    # image_path = "/home/jupyter-j7d203/drawing_dataset/97511345-행복한-가족의-어린이-사진-벡터-일러스트-레이-션.jpg"

    test_image = Image.open(image).convert("RGB")
    test_image = np.array(test_image)

    to_tensor = torchvision.transforms.ToTensor()

    test_image = to_tensor(test_image).unsqueeze(0)

    targets = []
    d = {}
    # d['boxes'] = torch.tensor(bbox, device=device)
    # d['labels'] = torch.tensor([label_dic[x] for x in object_name], dtype=torch.int64, device=device)
    targets.append(d)
    model.eval()
    predictions = model(test_image.to(device))
    boxes = predictions[0]['boxes']
    labels = predictions[0]['labels']

    # print("<Answer>")
    # print(object_name, bbox)

    # print("<Prediction>")
    objects = []
    for lb in labels:
        objects.append([k for k, v in label_dic.items() if v == lb][0])

    tag_dic = dict()
    for a, b in zip(objects, boxes):
        tag_dic[a] = tag_dic.get(a, [])
        tag_dic[a].append(b.tolist())

    # 태그:위치 딕셔너리를 보내는 버전
    return tag_dic

    # 태그만 보내는 버전
    # return objects
