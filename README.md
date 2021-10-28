# Työllisyyspalvelut site

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Related repositories
- [Drupal employment services](https://github.com/City-of-Helsinki/drupal-employment-services)
- [Employment services content sync functions](https://github.com/City-of-Helsinki/employment-services-content-sync)
## Tech Stack

The project is created with the Create React App framework.

## Setup and Usage

Copy `.env.example` to `.env`.

Required env variables:

| name                 | description                                                                                        |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| REACT_APP_DRUPAL_URL | Drupal for frontend                                                                                |
| SERVER_PORT          | Use `7000` for local environment.                                                                  |
| ELASTICSEARCH_URL    | Elasticsearch URL.                                                                                 |


## Local development Flow

Run project with the following commands in project root:

```
nvm use

# install server depencencies
npm install --prefix server/

# install frontend dependencies.
npm install

# run server and frontend
npm start
```
