FROM node:15-alpine

# https://github.com/nodejs/docker-node/issues/384#issuecomment-305208112
run apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install --quiet node-gyp -g &&\
  npm install --quiet

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

COPY public ./public
COPY server.js ./server.js

USER node

CMD [ "node", "server.js" ]
