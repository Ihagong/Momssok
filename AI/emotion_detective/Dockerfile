
FROM python

WORKDIR /app/

COPY ./fastApi2.py /app/
COPY ./ /app/

RUN pip install -r requirements.txt

CMD uvicorn --host=0.0.0.0 --port 8004 fastApi2:app


