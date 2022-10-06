## 감정 분석 API 서버

- Dockerfile 설정

fastapi 서버를 실행하기 위해서 먼저 도커 이미지를 만들어야 한다.
```

FROM python:3.7

WORKDIR /app/

COPY ./fastApi2.py /app/
COPY ./ /app/

RUN pip install -r requirements.txt

CMD uvicorn --host=0.0.0.0 --port 8004 fastApi2:app

```

프로젝트 폴더에 Dockerfile을 생성
pip install로 필요한 라이브러리 설치
파이썬 버전 3.7 사용, uvicorn으로 fastApi를 실행하며 8004포트 사용


requirements.txt
```
anyio==1.3.1
async-generator==1.10
boto3==1.15.18
botocore==1.18.18
certifi
chardet==3.0.4
charset-normalizer==2.1.1
click==8.1.3
colorama==0.4.5
Cython==0.29.32
fastapi==0.68.2
filelock==3.8.0
gluonnlp==0.8.1
graphviz==0.8.4
h11==0.14.0
h5py==3.7.0
idna==2.6
importlib-metadata==5.0.0
jmespath==0.10.0
joblib==1.2.0
mxnet==1.5.0
numpy==1.16.6
packaging==21.3
pydantic==1.10.2
pyparsing==3.0.9
python-dateutil==2.8.2
regex==2022.9.13
s3transfer==0.3.7
sacremoses==0.0.53
sentencepiece==0.1.96
six==1.16.0
sniffio==1.3.0
starlette==0.14.2
tokenizers==0.9.4
torch==1.12.1
tqdm==4.64.1
transformers==4.2.2
typing_extensions==4.3.0
urllib3==1.22
uvicorn==0.18.3
wincertstore==0.2
zipp==3.8.1
```
Kobert 모델 사용을 위해 필요한 라이브러리 목록


- Jenkins 설정 - Execute shell

깃랩에 변경이 생기면 젠킨스에서 다음과 같이 실행된다.
```
docker image prune -a --force
mkdir -p /var/jenkins_home/images_tar
cd /var/jenkins_home/workspace/momssok/AI/emotion_detective/
docker build -t emotion_detective .
docker save emotion_detective > /var/jenkins_home/images_tar/emotion_detective.tar
```

Jenkins 지정 디렉토리에 빌드하여 docker image를 생성한다.


- Jenkins 설정 - Exec command

```
sudo docker load < /jenkins/images_tar/emotion_detective.tar
if (sudo docker ps | grep "emotion_detective"); then sudo docker stop emotion_detective; fi
sudo docker run -it -d --rm -p 8004:8004 --name emotion_detective emotion_detective
sudo docker rmi $(docker images -f "dangling=true" -q)
```

저장한 이미지를 사용해 도커 컨테이너 생성하여 실행
기존에 생성되어있던 컨테이너는 제거하고 새로 실행한다.
emotion_detective로 name을 설정하고 8004포트를 사용한다.

```
ubuntu@ip-172-26-12-159:~$ docker images
```
도커 이미지 목록 확인

```
REPOSITORY          TAG             IMAGE ID       CREATED          SIZE
emotion_detective   latest          2df04ef1cd79   17 hours ago     4.1GB
```

emotion_detective 도커 이미지가 생성된다.

```
docker ps -a
```
도커 컨테이너 목록 확인


```
CONTAINER ID   IMAGE                 COMMAND                  CREATED          STATUS                    PORTS                                                  NAMES
279ac3302f9f   emotion_detective     "/bin/sh -c 'uvicorn…"   17 hours ago     Up 17 hours               0.0.0.0:8004->8004/tcp, :::8004->8004/tcp              emotion_detective
```
emotion_detective 컨테이너가 실행 중이며, uvicorn으로 fastapi 서버가 8004포트에서 동작 중인 것을 확인



## MYSQL 도커 컨테이너에서 실행

- MYSQL 이미지 설치
```
docker pull mysql:8.0.17
```


-  MySQL 컨테이너 생성
```
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD={password} --name={mysql} mysql5.7
```

- 컨테이너 실행 확인
```
docker ps -a
CONTAINER ID   IMAGE                 COMMAND                  CREATED          STATUS                    PORTS                                                  NAMES
8ee71abf451e   mysql                 "docker-entrypoint.s…"   2 weeks ago      Up 13 days                0.0.0.0:3306->3306/tcp, :::3306->3306/tcp, 33060/tcp   mysql

```


- Docker MySQL 컨테이너 접속하기
```
docker exec -it {mysql} bash
 mysql -u root -p
```
패스워드 입력 후 접속


```
grant all privileges on *.* to 'root'@'%';
```
원격 접속 허용을 통해 외부에서 접속 가능하게 한다.



## 이미지 태그 API 서버

- Dockerfile 설정

```

FROM python

WORKDIR /app/

COPY ./server.py /app/
COPY ./requirements.txt /app/
COPY ./ /app/

RUN pip install -r requirements.txt

CMD uvicorn --host=0.0.0.0 --port 8003 server:app



```


requirements.txt
```
tokenizers
transformers
attrdict
uvicorn
numpy
fastapi
torch
pillow
matplotlib
torchvision
python-multipart

```


- Jenkins 설정 - Execute shell

깃랩에 변경이 생기면 젠킨스에서 다음과 같이 실행된다.
```
docker image prune -a --force
mkdir -p /var/jenkins_home/images_tar

cd /var/jenkins_home/workspace/momssok/AI/detection/
docker build -t detection .
docker save detection > /var/jenkins_home/images_tar/detection.tar
```

Jenkins 지정 디렉토리에 빌드하여 docker image를 생성한다.


- Jenkins 설정 - Exec command

```
sudo docker load < /jenkins/images_tar/detection.tar
if (sudo docker ps | grep "detection"); then sudo docker stop detection; fi
sudo docker run -it -d --rm -p 8003:8003 --name detection detection
```

저장한 이미지를 사용해 도커 컨테이너 생성하여 실행
기존에 생성되어있던 컨테이너는 제거하고 새로 실행한다.
emotion_detective로 name을 설정하고 8003포트를 사용한다.

```
ubuntu@ip-172-26-12-159:~$ docker images
```
도커 이미지 목록 확인

```
REPOSITORY          TAG             IMAGE ID       CREATED          SIZE
detection           latest          61cb62f4c7e6   19 hours ago   4.4GB

```

emotion_detective 도커 이미지가 생성된다.

```
docker ps -a
```
도커 컨테이너 목록 확인


```
CONTAINER ID   IMAGE                 COMMAND                  CREATED          STATUS                    PORTS                                                  NAMES
3759d630839a   detection             "/bin/sh -c 'uvicorn…"   19 hours ago   Up 19 hours               0.0.0.0:8003->8003/tcp, :::8003->8003/tcp              detection

```
emotion_detective 컨테이너가 실행 중이며, uvicorn으로 fastapi 서버가 8004포트에서 동작 중인 것을 확인

