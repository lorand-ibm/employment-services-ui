require('dotenv').config();
var express = require('express')
var router = express.Router()
let linkedevents = require('./linkedevents')

const app = express();
const api = require('./api');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router.all('/', function (req, res) {
  res.sendStatus(404)
})

app.get('/linkedevents', function (req, res) {
  linkedevents()
  console.log('call ok')
  res.sendStatus(200)
})

const port = process.env.SERVER_PORT || 9000;
app.listen(port, () => {
  console.log("Server running on port", port);
});
