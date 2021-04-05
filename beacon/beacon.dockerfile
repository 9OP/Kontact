FROM node:14-alpine

WORKDIR /app

COPY package*.json /

RUN npm install

EXPOSE 4000

COPY . .

# CMD ["npm", "run", "start:dev"]

# FROM node:14-alpine as base
# FROM base as builder

# WORKDIR /install

# COPY . .

# RUN npm install && npm run build

# FROM base

# WORKDIR /app

# COPY ./package*.json .
# COPY --from=builder /install/build ./build
# # COPY --from=builder /install/locales ./locales
# # RUN yarn install --prod

# EXPOSE 4000

# CMD [ "node", "./build/index.js" ]
