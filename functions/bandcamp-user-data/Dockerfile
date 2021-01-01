FROM mcr.microsoft.com/playwright:bionic

WORKDIR /app
COPY . .

RUN yarn
RUN yarn build

EXPOSE 8080

CMD [ "node", "dist/index.js" ]
