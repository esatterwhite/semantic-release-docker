# 0000-BASE
FROM docker:latest
ARG SRC_DIR='.'
RUN apk update && apk upgrade && apk add nodejs npm git curl
WORKDIR /opt/app
COPY ${SRC_DIR}/package.json /opt/app/
RUN npm install
COPY ${SRC_DIR} /opt/app
WORkDIR /opt/app
