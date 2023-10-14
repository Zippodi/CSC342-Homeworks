const express = require('express');
const hbs = require('hbs')
const app = express(); // Create a new server instance
const PORT = 80; // Port number we want to use of this server

const html_path = __dirname + '/templates/'; // HTML files folder

const date = new Date();
let pattern = /\d\d\d\d-\d\d\d\d-\d\d\d\d-\d\d\d\d/i;

app.set('view engine', 'hbs')
app.set('views', 'templates')

app.use(express.static('static'));
app.use(express.urlencoded({extended: true}));

const multer = require('multer');
const upload = multer({dest: 'static/uploads/'});


// Routes
app.get('/', (req, res) => {
    res.sendFile(html_path + 'form.html');
  });
  
  app.post('/send', upload.single('myfile'), (req, res) => {
  
    try {
      if (req.file.mimetype != "image/png" && req.file.mimetype != "image/jpg" && req.file.mimetype != "image/jpeg" && req.file.mimetype != "image/webp") {
        throw new Error("File input must be an image.");
      }
      if(req.body.firstname == "" || req.body.lastname == "" || req.body.firstname2 == "" || req.body.lastname2 == "") {
        throw new Error("name fields must not be empty");
      }
      if (req.body.message.length < 10) {
        throw new Error("message must be 10 characters long");
      }
      if (req.body.notify == "email" && req.body.email == "") {
        throw new Error("Empty email when Email was selected.");
      }
      if (req.body.notify == "SMS" && req.body.phone == "") {
        throw new Error("Empty phone when SMS was selected.");
      }
      if (req.body.CardType == "") {
        throw new Error("Card Type Required.");
      }
      if (req.body.cardNumber == "") {
        throw new Error("Card Number required.");
      }
      if (!pattern.test(req.body.cardNumber)) {
        throw new Error("Card Number must fit format XXXX-XXXX-XXXX-XXXX");
      }
      if (req.body.Expiration == "") {
        throw new Error("Expiration Date required.");
      }
      var dateArray = req.body.Expiration.split('-');

      if (dateArray[0] < date.getFullYear()) {
        throw new Error("Card Expired.");
      }
      else if (dateArray[1] < date.getMonth() + 1) {
        throw new Error("Card Expired.");
      }
      else if (dateArray[2] < date.getDate()) {
        throw new Error("Card Expired.");
      }
      
      if (req.body.CCV == "") {
        throw new Error("CCV required.");
      }
      if (req.body.CCV.length < 3 || req.body.CCV.length > 4) {
        throw new Error("CCV can only be 3 or 4 digits.");
      }
      if (isNaN(req.body.CCV)) {
        throw new Error("CCV must be a number.");
      }
      if (req.body.amount == "") {
        throw new Error("Amount required.");
      }
      if (Number(req.body.amount) == NaN) {
        throw new Error("Amount must be a number");
      }
      if (req.body.termsandconditions != "on") {
        throw new Error("Must accept terms and conditions.");
      }
      if (req.body.firstname2 == "Stuart" && req.body.lastname2 == "Dent") {
        throw new Error("Banned Recipient Name");
      }
      if (req.body.firstname2 == "Stu" && req.body.lastname2 == "Dent") {
        throw new Error("Banned Recipient Name");
      }
      
      let demo = {
        image: "",
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        firstname2: req.body.firstname2,
        lastname2: req.body.lastname2,
        amount: req.body.amount,
        image: req.body.image,
        message: req.body.message,
        notify: ""
    }
    let imagesource = req.file.path;
    imagesource = imagesource.slice(7);
    demo.image = imagesource;
    
    
    if (req.body.notify == "email") {
      demo.notify = "was notified via " + req.body.email; 
      
    
    }
    else if (req.body.notify == "SMS") {
      demo.notify = "was notified via " + req.body.phone; 
    }
    else {
      demo.notify = "was not notified of this"
    }
     
      
      res.render('success', { demo: demo });
   
    }
    catch(err) {
      let errorMessage = {
        ermessage: err
      }
       
      res.render('error', { errorMessage: errorMessage });
    }
  });

  
  
// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));