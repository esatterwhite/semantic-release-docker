# 0000-BASE
FROM docker:latest
RUN apk update && apk upgrade && apk add nodejs npm
WORKDIR /opt/app
COPY ./package.json /opt/app/
RUN npm install
COPY . /opt/app
WORkDIR /opt/app
