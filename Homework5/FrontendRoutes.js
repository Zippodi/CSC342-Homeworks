const express = require('express');
const router = express.Router();

const path = require('path');
const html_dir = path.join(__dirname ,'/templates/');

// router.get('/', (req, res) => {
//   res.sendFile(`${html_dir}index.html`);
// });

router.get('/', (req, res) => {
  res.sendFile(`${html_dir}login.html`);
});


router.get('/login', (req, res) => {
  res.sendFile(`${html_dir}login.html`);
});


module.exports = router;