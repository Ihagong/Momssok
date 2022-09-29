from multilabel_pipeline import MultiLabelPipeline
from transformers import ElectraTokenizer
from model import ElectraForMultiLabelClassification
from pprint import pprint
from fastapi import FastAPI # FastAPI 모듈 가져오기
import torch
import numpy as np
app = FastAPI() # 객체 생성

@app.get("/") # Route Path
def test_index():
	
    # Json 타입으로 값 반환
    return {
	    "Python": "Framework",
	}
@app.get("/emotion")
def emotion(text:str):
    tokenizer = ElectraTokenizer.from_pretrained("monologg/koelectra-base-v3-goemotions")
    model = ElectraForMultiLabelClassification.from_pretrained("monologg/koelectra-base-v3-goemotions")


    texts =text.split(".")
    print(texts[:-1])
    results = []
    emotions={}
    for txt in texts[:-1]:
        inputs = tokenizer(txt,return_tensors="pt")
        outputs = model(**inputs)
        scores =  1 / (1 + torch.exp(-outputs[0]))  # Sigmoid
        threshold = .3
        for item in scores:
            labels = []
            scores = []
            for idx, s in enumerate(item):
                if s > threshold:
                    if model.config.id2label[idx] in emotions.keys():
                        emotions[model.config.id2label[idx]]=emotions[model.config.id2label[idx]]+s.item()
                    else:
                        emotions[model.config.id2label[idx]]=s.item()
                    labels.append(model.config.id2label[idx])
                    scores.append(s.item())
            results.append({"labels": labels, "scores": scores})
    score_sum=0
    emotions_score=emotions.copy()
    for emotion in emotions.keys():
        score_sum+=emotions[emotion]
    for emotion in emotions.keys():
        emotions[emotion]=round(emotions[emotion]/score_sum*100)
    print(results)
    return {
        "emotions_percent": emotions,
        "emotions_score": emotions_score,
    }