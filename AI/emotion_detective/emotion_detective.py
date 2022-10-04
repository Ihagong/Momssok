from datasets import BERTDataset, max_len, batch_size
import torch
from torch.utils.data import Dataset
import numpy as np
from models import model, tok


def predict(predict_sentence):
    data = [predict_sentence, '0']
    dataset_another = [data]

    another_test = BERTDataset(dataset_another, 0, 1, tok, max_len, True, False)
    test_dataloader = torch.utils.data.DataLoader(another_test, batch_size=batch_size, num_workers=0)
    for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(test_dataloader):
        token_ids = token_ids.long()
        segment_ids = segment_ids.long()

        valid_length = valid_length
        label = label.long()
        out = model(token_ids, valid_length, segment_ids)
        scores = 1 / (1 + np.exp(-out.detach().numpy()))
        scores = scores[0]
        sum_scores = sum(scores)
        test_eval = []
        for i in out:
            logits = i
            logits = logits.detach().numpy()
            if np.argmax(logits) == 0:
                test_eval.append("분노")
            elif np.argmax(logits) == 1:
                test_eval.append("놀람")
            elif np.argmax(logits) == 2:
                test_eval.append("불안")
            elif np.argmax(logits) == 3:
                test_eval.append("행복")
            elif np.argmax(logits) == 4:
                test_eval.append("슬픔")

        for i in range(len(scores)):
            scores[i] = round((scores[i]/sum_scores) * 100, 2)

    return scores, test_eval[0]




#
A, B = predict("오늘은 엄마아빠와 놀이동산 가는 날인데 동생이 갑자기 아파서 병원에 가게되었다.")
print(A, B)