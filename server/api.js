const axios = require('axios')
const api = require('express').Router()

// TODO
api.get("/search/:query", (req, res) => {
  res.send({
    query: req.params.query,
    results: []
  });
})

api.get("/linkedevents", (req, res) => {
  let events = makeRequests();

  console.log(events);

  res.send({
    query: req.params.query,
    results: []
  });
})

module.exports = api;
