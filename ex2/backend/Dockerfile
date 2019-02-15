FROM node:10.8.0-alpine as node
COPY ./build /build
WORKDIR /build
COPY package.json /build
RUN npm install
EXPOSE 3001
CMD ["npm", "start"]
