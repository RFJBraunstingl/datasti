FROM adoptopenjdk:11-jdk-hotspot

RUN apt update && apt install -y nodejs npm

ADD backend .

RUN ./mvnw dependency:go-offline package clean
