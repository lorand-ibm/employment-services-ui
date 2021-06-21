FROM node:14

WORKDIR /usr/src/app

COPY .env ./

# Install React
COPY package.json ./
COPY package-lock.json ./

RUN npm install
RUN npm install -g react-scripts@4.0.1

# Build React
COPY ./ ./

RUN npm run build

# Install server
WORKDIR /usr/src/app/server

COPY server/package.json ./
COPY server/package-lock.json ./

RUN npm install
RUN npm run build

WORKDIR /usr/src/app

# Run server
CMD ["node", "server/build/index.js"]

