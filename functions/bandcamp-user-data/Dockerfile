FROM mcr.microsoft.com/playwright:bionic



WORKDIR /home/pwuser/app
COPY . .
RUN chown -R pwuser /home/pwuser/app

USER pwuser


RUN yarn
# RUN yarn add playwright
RUN yarn build

EXPOSE 8080


CMD [ "node", "dist/index.js" ]
