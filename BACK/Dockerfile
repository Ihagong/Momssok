#backend/Dockerfile

FROM openjdk:8 as builder
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src
RUN chmod +x ./gradlew
RUN ./gradlew bootJar

VOLUME /tmp

FROM openjdk:8
COPY --from=builder build/libs/*.jar app.jar

EXPOSE 8443

# 배포용 properties 실행 명령어
ENTRYPOINT ["java","-jar","app.jar","-Duser.timezone=Etc/GMT+3","--spring.config.name=application"] 


# 만약 배포용 properties를 사용하지 않는다면
# Default properties 실행 명령어
# ENTRYPOINT ["java","-jar","app.jar"]
