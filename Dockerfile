FROM node:12

WORKDIR /usr/src/app

COPY package-lock.json ./
COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "app.js"]