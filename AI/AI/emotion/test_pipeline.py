from multilabel_pipeline import MultiLabelPipeline
from transformers import ElectraTokenizer
from model import ElectraForMultiLabelClassification
from pprint import pprint


tokenizer = ElectraTokenizer.from_pretrained("monologg/koelectra-base-v3-goemotions")
model = ElectraForMultiLabelClassification.from_pretrained("monologg/koelectra-base-v3-goemotions")


texts = [
    "전혀 재미 있지 않습니다 ...",
    "개노잼"
]
import torch
import numpy as np
results = []
for txt in texts:
    inputs = tokenizer(txt,return_tensors="pt")
    outputs = model(**inputs)
    scores =  1 / (1 + torch.exp(-outputs[0]))  # Sigmoid
    threshold = .3
    for item in scores:
        labels = []
        scores = []
        for idx, s in enumerate(item):
            if s > threshold:
                labels.append(model.config.id2label[idx])
                scores.append(s.item())
        results.append({"labels": labels, "scores": scores})
print(results)
#pprint(goemotions(texts))
