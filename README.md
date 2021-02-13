# Työllisyyspalvelut

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Tech Stack

The project is created with the Create React App framework.

## Setup and Usage

Copy `.env.example` to `.env`.

Descriptions:

| name                 | description                                                                                        |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| REACT_APP_DRUPAL_URL | Drupal for front end. Use `https://edit.test.tyollisyyspalvelut.hel.fi` for testing envionrment.   |
| SERVER URL           | Use `9000` for local environment.                                                                  |


## Developer's Flow

Run project with the following commands in project root:

```
nvm use

# install server depencencies
yarn --cwd server

# install front end dependencies
yarn

# run server and front end
yarn start
```

## Build & Deployment

The deployments are still WIP.

The project can be built and run with Docker. See `Dockerfile`.

Steps:
- Define `.env` in project root.
- Build docker image `docker build -t node .`
- Run docker container `docker run -d -p 127.0.0.1:9000:9000 node`. *Note*: Expose node server port as needed with the `-p` flag.
