const express = require('express');
const router = express.Router();

let howls = require('./data/howls.json');
let followers = require('./data/follows.json');
let users = require('./data/users.json');


router.get('/api/howls', (req, res) => {
  res.json(howls);
});

router.get('/api/follows', (req, res) => {
  res.json(followers);
});

router.get('/api/users', (req, res) => {
  res.json(users);
});

module.exports = router;