const express = require('express');
const router = express.Router();

const path = require('path');
const html_dir = path.join(__dirname ,'/templates/');


router.get('/', (req, res) => {
  res.sendFile(`${html_dir}login.html`);
});


router.get('/index', (req, res) => {
  res.sendFile(`${html_dir}index.html`);
});

router.get('/error', (req, res) => {
  res.sendFile(`${html_dir}error.html`);
});



module.exports = router;