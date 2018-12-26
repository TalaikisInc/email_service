FROM keymetrics/pm2:latest-alpine

LABEL app.service="web"

RUN npm i -g pm2

WORKDIR /var/www/app
COPY ./ ./
RUN npm i

ENV NODE_ENV production 
ENV PORT 3001
EXPOSE 3001

CMD ["pm2-runtime", "start.js"]
