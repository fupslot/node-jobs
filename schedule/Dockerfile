FROM node:16.13-alpine3.14

WORKDIR /schedule

COPY package.json .
RUN yarn install
RUN npm install -g nodemon

COPY . .

ENV PORT=5000
EXPOSE $PORT 9999

CMD [ "nodemon", "--inspect=0.0.0.0:9999", "./index.js" ]