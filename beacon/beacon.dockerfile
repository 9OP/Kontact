FROM node:14-alpine

WORKDIR /beacon

COPY package*.json /

RUN npm install

COPY . /

# CMD ["npm", "run", "start:dev"]
