FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 3000

# Define el comando para correr la aplicación
CMD [ "npm", "start" ]