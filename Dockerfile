FROM node:15-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

COPY public ./public
COPY server.js ./server.js

USER node

CMD [ "node", "server.js" ]
