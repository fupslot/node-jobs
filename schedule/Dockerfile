FROM node:16.13-alpine3.14

WORKDIR /schedule

COPY package.json .
RUN yarn install

COPY . .

ENV PORT=5000
EXPOSE $PORT

CMD [ "node", "index.js" ]