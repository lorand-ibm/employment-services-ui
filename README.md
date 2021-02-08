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

TODO
