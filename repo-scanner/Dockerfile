FROM node:10-alpine

LABEL "name"="repo-scanner"
LABEL "maintainer"="Bethany Dunfield <bethany.dunfield@cds-snc.ca>"
LABEL "version"="1.0.0"

RUN mkdir /app
COPY . /app/
WORKDIR /app

ENV NODE_ENV=production
RUN npm install
ENV PATH="${PATH}:/node_modules/.bin"

CMD ["node", "/app/src/index"]