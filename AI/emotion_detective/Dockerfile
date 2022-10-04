
FROM python:3.9

WORKDIR /app2/

COPY ./fastApi2.py /app2/
COPY ./ /app2/

RUN pip install -r requirements.txt

CMD uvicorn --host=0.0.0.0 --port 8004 fastApi2:app


