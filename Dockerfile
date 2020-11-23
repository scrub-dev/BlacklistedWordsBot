FROM node:15.2.1-alpine3.10

RUN mkdir -p /bot
WORKDIR /bot

RUN npm install pm2 -g

COPY package.json /bot
RUN npm install

COPY . /bot

ENV TOKEN=YOURTOKENHERE

CMD ["pm2-runtime", "index.js"]