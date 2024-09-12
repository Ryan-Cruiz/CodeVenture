FROM node:18.16.0-alpine

RUN mkdir -p /var/www/app

WORKDIR /var/www/app

COPY package*.json ./


RUN npm install && npm cache clean --force

ENV PATH=/var/www/app/node_modules/.bin:$PATH

RUN mkdir -p /var/www/app/src

WORKDIR /var/www/app/src

EXPOSE 3001

COPY src ./src
COPY system ./system
COPY app.js ./
# COPY passport.js ./
# COPY env ./
# Start the app using serve command
CMD [ "npm", "start" ]


