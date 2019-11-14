FROM node:alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8000

RUN npm run build
