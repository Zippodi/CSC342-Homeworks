const express = require('express');
const hbs = require('hbs')
const app = express(); // Create a new server instance
const PORT = 3000; // Port number we want to use of this server

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
  
  app.post('/formdata', upload.single('myfile'), (req, res) => {
    // app.post('/Homework3/templates/success.html', upload.single('myfile'), (req, res) => {
    console.log(req.body);
  
    try {
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
        throw new Error("STUART!!!!!!");
      }
      if (req.body.firstname2 == "Stu" && req.body.lastname2 == "Dent") {
        throw new Error("STUART!!!!!!");
      }
      // res.send(req.body);
      // res.sendFile(html_path + "success.html");
      
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
    demo.image = req.file.path;
    console.log(demo.image);
    
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
      
      res.sendFile(html_path + "error.html");
      //res.send(req.body);
      // res.send("Validation Failed. " + err);
    }
  });

  
  
// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));