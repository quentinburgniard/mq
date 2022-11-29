FROM node:19
ENV NODE_ENV production
WORKDIR /usr/src/app
RUN npm install pm2 -g
COPY package.json .
RUN npm install
COPY . .
CMD pm2-runtime index.js