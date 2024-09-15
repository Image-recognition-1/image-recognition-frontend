FROM node:latest

RUN npm install -g @quasar/cli

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 9000

WORKDIR /app/dist/pwa

CMD ["quasar", "dev", "--history"]
