# 이미지 태그기능🏷

### 담당자 : 김다은



### 파일 설명

- `train.py` : 학습코드 -> gpu서버
- `server.py` : faster api 연결 코드
- `faster-rcnn-model.py` : faster-rcnn 모델
-  `test.py` : 테스트 및 수행 image to result 파이프라인
- `Epoch.${number}.pth` : number만큼 학습한 가중치 저장파일



#### 임시 fastAPI 연결경로

`http://localhost:8000/tag` + image 파일



#### ❗test.py에 return 딕셔너리 버전, 리스트버전 있습니다

--> 수정할때마다 업데이트 하겠습니다

---

### 기술 설명

- RPN + Fast R-CNN = Faster R-CNN

- 과정

  1) region proposal 추출 → 전체 image CNN 연산 → RoI projection, RoI Pooling

  2. classification, bounding box regression

- detection에 쓰인 conv feature을 RPN에서도 공유해서 RoI생성 역시 CNN level에서 수행



### 코드 설명

- backbone : 이미지의 피처맵을 뽑는 네트워크

  - VGG16 - faster rcnn 기본 네트워크

  - Resnet50 - 정확성을 높인 네트워크

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

- RPN(Region Proposal Network)
  - VGG16 마지막 차원: 512
  - Resnet50 마지막 차원: 2048
  - 이미지 사이즈: 짧은 부분을 400 픽셀로 고정, 긴 부분은 최대 600픽셀
  - Non Maximum Suppression (NMS) 이전 anchor box 개수: 6000
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

- 참고

  ```
          backbone (nn.Module): the network used to compute the features for the model.
              It should contain a out_channels attribute, which indicates the number of output
              channels that each feature map has (and it should be the same for all feature maps).
              The backbone should return a single Tensor or and OrderedDict[Tensor].
              
          num_classes (int): number of output classes of the model (including the background).
              If box_predictor is specified, num_classes should be None.
              
          min_size (int): minimum size of the image to be rescaled before feeding it to the backbone
          max_size (int): maximum size of the image to be rescaled before feeding it to the backbone
          
          image_mean (Tuple[float, float, float]): mean values used for input normalization.
              They are generally the mean values of the dataset on which the backbone has been trained
              on
              
          image_std (Tuple[float, float, float]): std values used for input normalization.
              They are generally the std values of the dataset on which the backbone has been trained on
          rpn_anchor_generator (AnchorGenerator): module that generates the anchors for a set of feature
              maps.
              
          rpn_head (nn.Module): module that computes the objectness and regression deltas from the RPN
          rpn_pre_nms_top_n_train (int): number of proposals to keep before applying NMS during training
          rpn_pre_nms_top_n_test (int): number of proposals to keep before applying NMS during testing
          rpn_post_nms_top_n_train (int): number of proposals to keep after applying NMS during training
          rpn_post_nms_top_n_test (int): number of proposals to keep after applying NMS during testing
          rpn_nms_thresh (float): NMS threshold used for postprocessing the RPN proposals
          
          rpn_fg_iou_thresh (float): minimum IoU between the anchor and the GT box so that they can be
              considered as positive during training of the RPN.
              
          rpn_bg_iou_thresh (float): maximum IoU between the anchor and the GT box so that they can be
              considered as negative during training of the RPN.
              
          rpn_batch_size_per_image (int): number of anchors that are sampled during training of the RPN
              for computing the loss
              
          rpn_positive_fraction (float): proportion of positive anchors in a mini-batch during training
              of the RPN
              
          rpn_score_thresh (float): during inference, only return proposals with a classification score
              greater than rpn_score_thresh
              
          box_roi_pool (MultiScaleRoIAlign): the module which crops and resizes the feature maps in
              the locations indicated by the bounding boxes
              
          box_head (nn.Module): module that takes the cropped feature maps as input
          box_predictor (nn.Module): module that takes the output of box_head and returns the
              classification logits and box regression deltas.
              
          box_score_thresh (float): during inference, only return proposals with a classification score
              greater than box_score_thresh
              
          box_nms_thresh (float): NMS threshold for the prediction head. Used during inference
          box_detections_per_img (int): maximum number of detections per image, for all classes.
          box_fg_iou_thresh (float): minimum IoU between the proposals and the GT box so that they can be
              considered as positive during training of the classification head
              
          box_bg_iou_thresh (float): maximum IoU between the proposals and the GT box so that they can be
              considered as negative during training of the classification head
              
          box_batch_size_per_image (int): number of proposals that are sampled during training of the
              classification head
              
          box_positive_fraction (float): proportion of positive proposals in a mini-batch during training
              of the classification head
              
          bbox_reg_weights (Tuple[float, float, float, float]): weights for the encoding/decoding of the
              bounding boxes
              
          keypoint_roi_pool (MultiScaleRoIAlign): the module which crops and resizes the feature maps in
               the locations indicated by the bounding boxes, which will be used for the keypoint head.
               
          keypoint_head (nn.Module): module that takes the cropped feature maps as input
          keypoint_predictor (nn.Module): module that takes the output of the keypoint_head and returns the
              heatmap logits
  
  ```