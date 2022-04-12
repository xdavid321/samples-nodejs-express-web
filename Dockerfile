FROM node:16-alpine
WORKDIR /app
COPY index.js .
COPY package.json .
RUN npm install
ENTRYPOINT [ "node", "index.js" ]
EXPOSE 80