FROM node:16

# Create app directory
WORKDIR /usr/src/etenlab/discussion-subscriptions-api

COPY . .

RUN npm ci
RUN npm run build

CMD [ "npm", "run", "start:prod" ]
