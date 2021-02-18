FROM node:14

WORKDIR /usr/src/app

COPY .env ./

# Install React
COPY package.json ./
COPY yarn.lock ./

RUN yarn install

# Build React
COPY ./ ./

RUN yarn run build

# Install server
WORKDIR /usr/src/app/server

COPY server/package.json ./
COPY server/yarn.lock ./

RUN yarn install
RUN yarn run build

WORKDIR /usr/src/app

# Run server
CMD ["node", "server/build/index.js"]
