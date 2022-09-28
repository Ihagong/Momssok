
FROM python

WORKDIR /app/

COPY ./server.py /app/
COPY ./requirements.txt /app/
COPY ./ /app/

RUN pip install -r requirements.txt

CMD uvicorn --host=0.0.0.0 --port 8005 server:app
