FROM keymetrics/pm2:latest-alpine

LABEL app.service="web"

RUN npm i -g pm2
RUN npm i -g @zeit/ncc

WORKDIR /var/www/app
COPY ./ ./
RUN npm i

ENV NODE_ENV production 
ENV PORT 3000

RUN npm run compile

EXPOSE 3000

CMD ["pm2-runtime", "dist/"]
