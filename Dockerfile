FROM node:lts-alpine

LABEL maintainer = "kohei"
LABEL description = "JavaScript environment"

ARG DEBIAN_FRONTEND=noninteractive
ENV TZ = "Asia/Tokyo"
ENV TERN = "xtern-color"

RUN mkdir -p /home

WORKDIR /home