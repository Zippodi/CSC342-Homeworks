const express = require('express');
const router = express.Router();

let howls = require('./data/howls.json');
let followers = require('./data/follows.json');
let users = require('./data/users.json');


router.get('/howls', (req, res) => {
  res.json(howls);
});

router.get('/follows', (req, res) => {
  res.json(followers);
});

router.get('/users', (req, res) => {
  res.json(users);
});