const api = require('express').Router()

// TODO
api.get("/search/:query", (req, res) => {
  res.send({
    query: req.params.query,
    results: []
  });
})

module.exports = api;