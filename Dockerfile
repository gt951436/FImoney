FROM node:18

WORKDIR /fimoney

COPY package*.json ./
RUN npm install

COPY . .

ENV PORT = 8080

EXPOSE $PORT

CMD ["node", "server.js"]
