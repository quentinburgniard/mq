FROM node:19
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
COPY service/package.json ./service/
COPY screenshot/package.json ./screenshot/
RUN npm install
COPY . ./
RUN ls -al
CMD node index.js