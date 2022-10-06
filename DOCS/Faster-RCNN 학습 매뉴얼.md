## Faster-RCNN 학습 매뉴얼

1. 아나콘다 및 CUDA 환경설정

   - AI 로컬 환경설정 매뉴얼 참고

2. Pascal VOC 형태의 annotation 데이터와 이미지 원본 준비

3. detection 폴더 train.py에서 `xml_path` 와 `image_path` 수정

4. `total_epoch`과 `len_data` 설정

   ```
   total_epoch = 70    # 반복회수 설정
   len_data = 748 	# 총 데이터 개수
   ```

5. `torch.save`(체크포인트 저장 경로) 설정

6. 아나콘다 실행

   ```
   > conda activate {env_name}
   > cd {train.py경로}
   > python train.py
   ```

   