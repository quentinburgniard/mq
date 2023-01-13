FROM node:19
ENV NODE_ENV production
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
CMD node index.js