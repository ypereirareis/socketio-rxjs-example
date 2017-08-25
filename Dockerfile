FROM node:8.4.0-alpine
WORKDIR /app
RUN npm install -g yarn
ADD ./ /app
RUN yarn install
VOLUME /app
CMD ["npm", "start"]