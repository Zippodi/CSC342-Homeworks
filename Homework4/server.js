const express = require('express');

const app = express();
const PORT = 3000;

// Designate the public folder as serving static resources
app.use(express.static('static'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

s