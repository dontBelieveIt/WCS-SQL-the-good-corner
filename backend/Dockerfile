FROM node:lts-alpine

WORKDIR /app

COPY *.json . 
RUN npm i
COPY src src 

CMD npm run start
