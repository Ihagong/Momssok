### 담당자 : 김다은



### 파일 설명

- `train.py` : 학습코드 -> gpu서버
- `server.py` : faster api 연결 코드
- `faster-rcnn-model.py` : faster-rcnn 모델
-  `test.py` : 테스트 및 수행 image to result 파이프라인
- `Epoch.${number}.pth` : number만큼 학습한 가중치 저장파일



#### 임시 fastAPI 연결경로

`http://localhost:8000/tag` + image 파일



#### test.py에 return 딕셔너리 버전, 리스트버전 있습니다

--> 수정할때마다 업데이트 하겠습니다

---

### 기술 설명

- CosineAnnealingLR(스케줄러) : 진동하는 방식

  - ```
    scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer,total_epoch,eta_min=0.00001)
    ```

  - total_epoch 주기만큼 eta_min 만큼 진동

- torch.optim.SGD(옵티마이저): 기울기 이동

  - ```
    optimizer = torch.optim.SGD(params = model.parameters(),lr = 0.001, momentum = 0.9, weight_decay=0.0005)
    ```

  - 미분값을 lr만큼 이동, momentum만큼 관성을주어 지역해애 빠지지 않도록 함

  - Weight decay는 모델의 weight의 제곱합을 패널티 텀으로 주어 (=제약을 걸어) loss를 최소화

- anchor_generator: 박스 생성

  - ```
    anchor_generator = torchvision.models.detection.rpn.AnchorGenerator(sizes=((128, 256, 512),),aspect_ratios=((0.5, 1.0, 2.0),))
    ```

  - anchor box size: (128, 256, 512)

  - anchor box aspect ratio: (0.5, 1.0, 2.0)

- rpn
  - VGG16 마지막 차원: 512
  - anchor box size: (128, 256, 512)
  - anchor box aspect ratio: (0.5, 1.0, 2.0)
  - 이미지 사이즈: 짧은 부분을 600픽셀로 고정, 긴 부분은 최대 1000픽셀
  - NMS이전 anchor box 개수: 6000
  - NMS threshold: 0.7
  - NMS이후 anchor box 개수: 2000(train), 300(test)
  - parameter 초기화: 평균0, 표준편차 0.01의 가우스 분포
- fast rcnn
  - RoI pooling layer: MultiScaleRoIAlign
  - RoI pooling size: 7x7
  - RoI head: 두개의 FC layer (inputsize x 4096),(4096x4096)
  - Class 개수: 23개 (22개 class + 배경)
  - Batch size: 128
  - foreground threshold: 0.5
  - background threshold: 0.5
  - positive fraction: 0.25
  - parameter 초기화: classification 평균 0, 표준편차 0.01 / bounding-box regression 평균 0, 표준편차 0.001 가우스 분포