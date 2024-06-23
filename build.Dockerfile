FROM node:16-alpine3.15 as installer
RUN apk update && \
    apk upgrade && \
    apk add --virtual .gyp python3 make g++ util-linux &&  \
    rm -rf /var/cache/apk/*
RUN npm install -g npm
WORKDIR /srv

COPY package.json package-lock.json ./
ARG NPM_TOKEN
RUN npm install

FROM installer as build-prod
COPY . .
ARG NPM_TOKEN
RUN npm run build
RUN node post-build.js

FROM installer as build-stagingqa
COPY . .
ARG NPM_TOKEN
RUN npm run buildstagingqa
RUN node post-build.js

FROM installer as build-staging
COPY . .
ARG NPM_TOKEN
RUN npm run buildstaging
RUN node post-build.js
