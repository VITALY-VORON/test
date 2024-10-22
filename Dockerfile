FROM alpine:3.19

RUN apk update && apk add --update git python3 make g++ curl bash nodejs npm && \
    npm install -g yarn

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN rm -rf node_modules/.cache
RUN rm -rf dist

# Собираем проект
RUN yarn build

CMD ["yarn", "start"]
