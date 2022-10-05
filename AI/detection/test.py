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


    label_dic = {'비행기': 1, '동물': 2, '새': 3, '배': 4, '건물': 5, '자동차': 6, '고양이': 7, '구름': 8, '강아지': 9,
     '코끼리': 10, '물고기': 11, '꽃': 12, '과일': 13, '하트': 14, '달': 15, '사람': 16, '놀이': 17,
     '무지개': 18, '로켓': 19, '별': 20, '해': 21, '나무': 22}


    # 모델 불러오기
    model = faster_rcnn_model.faster_rcnn()


    model.to(device)
    # 학습 가중치 load
    saved_checkpoint = torch.load("Epoch30.pth", map_location=device)
    model.load_state_dict(saved_checkpoint, strict=False)  # 훈련파일

    """
    png이미지(RGBA) RGB로 convert
    넘파이 배열로 변환
    """
    test_image = Image.open(image).convert('RGB')
    test_image = np.array(test_image)

    """
    텐서화하고 차원 4개로 맞춰줌
    """
    to_tensor = torchvision.transforms.ToTensor()
    test_image = to_tensor(test_image).unsqueeze(0)

    targets = []
    d = {}
    # d['boxes'] = torch.tensor(bbox, device=device)
    # d['labels'] = torch.tensor([label_dic[x] for x in object_name], dtype=torch.int64, device=device)
    targets.append(d)
    model.eval()
    """
    예상 결과 담기
    """
    predictions = model(test_image.to(device))
    boxes = predictions[0]['boxes']
    labels = predictions[0]['labels']

    # print("<Answer>")
    # print(object_name, bbox)

    # print("<Prediction>")
    """
    숫자로 나와있는 예상 label object
    문자로 변환
    """
    objects = []
    for lb in labels:
        objects.append([k for k, v in label_dic.items() if v == lb][0])

    tag_dic = dict()
    """
    오브젝트 종류별 박스위치 더하기
    ex) {고양이:[[1, 1, 10, 10], [0, 0, 5, 5] ... }
    """
    for a, b in zip(objects, boxes):
        tag_dic[a] = tag_dic.get(a, [])
        tag_dic[a].append(b.tolist())

    # 태그:위치 딕셔너리를 보내는 버전
    # return tag_dic

    # 태그만 보내는 버전
    # 중복제거
    return list(set(objects))
