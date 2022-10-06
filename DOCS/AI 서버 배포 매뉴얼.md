## 이미지 디텍션 API 서버

- Dockerfile 설정

```

FROM python:3.7

WORKDIR /app/

COPY ./fastApi2.py /app/
COPY ./ /app/

RUN pip install -r requirements.txt

CMD uvicorn --host=0.0.0.0 --port 8004 fastApi2:app

```
