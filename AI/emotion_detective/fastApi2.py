from fastapi import FastAPI
from emotion_detective import predict
app = FastAPI()

# @app.post("/items/{item_id}")
@app.post("/emotion")
def read_item(item_id: str):
    A, B = predict(item_id)
    A.tolist()
    print(type(A))
    print(type(B))
    return {
        "angry": round(A[0],2),
        "Surprised": round(A[1],2),
        "anxious": round(A[2],2),
        "happy": round(A[3],2),
        "sad": round(A[4],2),
        "emotion": B,
    }
#
# uvicorn fastApi:app --reload
