FROM node:16.13-alpine3.14

WORKDIR /schedule-ui

COPY package.json .
RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "node", "./node_modules/.bin/vite", "--host=0.0.0.0" ]