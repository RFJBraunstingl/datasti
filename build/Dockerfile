FROM adoptopenjdk:11-jdk-hotspot

RUN apt update && apt install -y nodejs npm

RUN cd backend && ./mvnw dependency:resolve