FROM openjdk:16-alpine3.13

EXPOSE 8080

WORKDIR /app

COPY build/libs/*.jar /app/neighbors-0.0.1-SNAPSHOT.jar

ENTRYPOINT ["java","-jar","/app/neighbors-0.0.1-SNAPSHOT.jar"]