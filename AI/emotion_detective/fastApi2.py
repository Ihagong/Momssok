from fastapi import FastAPI
from emotion_detective import predict
app = FastAPI()

# @app.post("/items/{item_id}")
@app.post("/emotion")
def read_item(item_id: str):
    A, B = predict(item_id)
    A=A.tolist()
    print(type(A))
    print(type(B))
    return {
        "분노": round(A[0],2),
        "놀람": round(A[1],2),
        "불안": round(A[2],2),
        "행복": round(A[3],2),
        "슬픔": round(A[4],2),
        "emotion": B,
    }
#
# uvicorn fastApi:app --reload
