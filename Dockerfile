FROM node:16

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

COPY demo ./demo
COPY server.js ./server.js

USER node

CMD [ "node", "server.js" ]
