FROM mcr.microsoft.com/playwright:bionic

WORKDIR /app
COPY . .

RUN yarn
RUN yarn build
RUN node ./node_modules/playwright/install.js

EXPOSE 8080


CMD [ "node", "dist/index.js" ]
