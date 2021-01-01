FROM mcr.microsoft.com/playwright:bionic

USER pwuser

WORKDIR /app
COPY . .

RUN yarn
# RUN yarn add playwright
RUN yarn build

EXPOSE 8080


CMD [ "node", "dist/index.js" ]
