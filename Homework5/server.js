const express = require('express');

const app = express();
const PORT = 80;

app.use(express.static('static'));
app.use(express.urlencoded({extended: true}));


const routes = require('./src/routes');
app.use(routes);

const frontendRoutes = require('./FrontendRoutes');
app.use(frontendRoutes);

// console.log(Math.floor(Date.now() / 1000));
// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));