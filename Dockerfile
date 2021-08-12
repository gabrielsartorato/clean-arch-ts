FROM node:14

# ONDE DENTRO DO CONTAINER SERÁ PUBLICADO
WORKDIR /usr/src/clean-node-api

COPY ./package.json .

RUN npm install --only=prod

COPY ./dist ./dist

# LIBERAR A PORTA
EXPOSE 5000

CMD npm start