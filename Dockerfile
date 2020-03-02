FROM node:10
EXPOSE 3000
WORKDIR /Blackboard/server

COPY package*.json ./
RUN npm install

COPY . .
CMD [ "node", "server/index.js" ]
CMD [ "npm", "run", "db-dev" ]