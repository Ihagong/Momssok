

from torch.utils.data import Dataset
import gluonnlp as nlp
import numpy as np

from gluonnlp.data import SentencepieceTokenizer

max_len = 64
batch_size = 128
warmup_ratio = 0.1
max_grad_norm = 1
log_interval = 200
learning_rate = 5e-5

class BERTDataset(Dataset):
    def __init__(self, dataset, sent_idx, label_idx, bert_tokenizer, max_len, pad, pair):
        transform = nlp.data.BERTSentenceTransform(bert_tokenizer, max_seq_length=max_len, pad=pad, pair=pair)
        self.sentences = [transform([i[sent_idx]]) for i in dataset]
        self.labels = [np.int32(i[label_idx]) for i in dataset]

    def __getitem__(self, i):
        return (self.sentences[i] + (self.labels[i],))

    def __len__(self):
        return (len(self.labels))