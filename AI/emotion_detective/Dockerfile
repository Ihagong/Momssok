
FROM python

WORKDIR /app/

COPY ./fastApi2.py /app/
COPY ./ /app/
RUN pip install tokenizers
RUN pip install transformers
RUN pip install attrdict
RUN pip install uvicorn
RUN pip install numpy
RUN pip install fastapi
RUN pip install torch
RUN pip install gluonnlp
 
#RUN pip install -r requirements.txt

CMD uvicorn --host=0.0.0.0 --port 8004 fastApi2:app


