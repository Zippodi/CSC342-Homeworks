const express = require('express');
const app = express(); // Create a new server instance
const PORT = 3000; // Port number we want to use of this server

const html_path = __dirname + '/templates/'; // HTML files folder

// Routes
app.get('/', (req, res) => {
    res.sendFile(html_path + 'form.html');
  });





// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));