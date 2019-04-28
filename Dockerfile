FROM keymetrics/pm2:latest-alpine

LABEL app.service="web"

RUN npm i -g pm2

WORKDIR /var/www/app
COPY ./ ./
RUN npm i

ENV NODE_ENV production 
ENV PORT 3000
EXPOSE 3000
USER node

CMD ["pm2-runtime", "start.js"]
