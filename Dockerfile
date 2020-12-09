FROM node:15.3.0-buster

RUN mkdir -p /bot
WORKDIR /bot

RUN npm install pm2 -g

RUN apt-get update && \ 
    apt-get install -y build-essential \
    wget \
    python3 \
    make \
    gcc \ 
    libc6-dev 
RUN npm install node-gyp -g

COPY package.json /bot
RUN npm install

COPY . /bot
#ENV TOKEN=YOURTOKENHERE

CMD ["pm2-runtime", "index.js"]