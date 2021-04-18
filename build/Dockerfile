FROM adoptopenjdk:11-jdk-hotspot

RUN apt update && apt install -y nodejs npm

RUN ls -lah

RUN cd ../backend && ./mvnw dependency:resolve
