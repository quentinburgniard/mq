FROM node:19
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
CMD node index.js