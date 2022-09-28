import torch      #pytorch
import torchvision      #torchvision


def faster_rcnn():
    # GPU연결
    if torch.cuda.is_available():
        device = torch.device('cuda:0')
    else:
        device = torch.device('cpu')
    # 백본모델(pretrained imagenet)
    backbone = torchvision.models.vgg16(pretrained=True).features[:-1]

    # 백본 마지막 레이어 채널수
    backbone_out = 512
    backbone.out_channels = backbone_out

    anchor_generator = torchvision.models.detection.rpn.AnchorGenerator(sizes=((128, 256, 512),),aspect_ratios=((0.5, 1.0, 2.0),))

    resolution = 7
    roi_pooler = torchvision.ops.MultiScaleRoIAlign(featmap_names=['0'], output_size=resolution, sampling_ratio=2)

    box_head = torchvision.models.detection.faster_rcnn.TwoMLPHead(in_channels= backbone_out*(resolution**2),representation_size=4096)
    box_predictor = torchvision.models.detection.faster_rcnn.FastRCNNPredictor(4096,23) #class 22개 + 배경 1개

    model = torchvision.models.detection.FasterRCNN(backbone, num_classes=None,
                                                    min_size=600, max_size=1000,
                                                    rpn_anchor_generator=anchor_generator,
                                                    rpn_pre_nms_top_n_train=6000, rpn_pre_nms_top_n_test=6000,
                                                    rpn_post_nms_top_n_train=2000, rpn_post_nms_top_n_test=300,
                                                    rpn_nms_thresh=0.7, rpn_fg_iou_thresh=0.7, rpn_bg_iou_thresh=0.3,
                                                    rpn_batch_size_per_image=256, rpn_positive_fraction=0.5,
                                                    box_roi_pool=roi_pooler, box_head=box_head,
                                                    box_predictor=box_predictor,
                                                    box_score_thresh=0.5, box_nms_thresh=0.5,
                                                    box_detections_per_img=300,
                                                    box_fg_iou_thresh=0.5, box_bg_iou_thresh=0.5,
                                                    box_batch_size_per_image=128, box_positive_fraction=0.25
                                                    )
    model.to(device)
    #roi head 있으면 num_class = None으로 함
    return model
