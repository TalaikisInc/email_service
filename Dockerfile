FROM keymetrics/pm2:latest-alpine

LABEL app.service="web"

ENV NODE_ENV production 
ENV PORT 3001

RUN npm i -g pm2

WORKDIR /var/www/app
COPY ./package.json ./
RUN npm i
COPY ./ ./

EXPOSE 3001

CMD ["pm2-runtime", "start.js"]
