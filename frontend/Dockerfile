FROM node:lts-alpine

WORKDIR /app

COPY *.json .
RUN npm i

COPY endPoint.tsx endPoint.tsx
COPY vite.config.ts .
COPY codegen.ts .
COPY index.html .
COPY public public
COPY src src

CMD npm run dev
