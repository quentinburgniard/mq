FROM node:19.4
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN apt-get update && apt-get install -y libnss3 libatk1.0-0 libatk-bridge2.0-0 && rm -rf /var/lib/apt/lists/* && npm install
COPY . ./
CMD node index.js