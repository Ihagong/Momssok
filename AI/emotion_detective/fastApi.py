from fastapi import FastAPI
from emotion_detective import predict
app = FastAPI()

# @app.post("/items/{item_id}")
@app.post("/emotion")
def read_item(item_id: str):
    A, B = predict(item_id)
    return {
        "angry": A[0],
        "Surprised": A[1],
        "anxious": A[2],
        "happy": A[3],
        "sad": A[4],
        "emotion": B,
    }
#
# uvicorn fastApi:app --reload
