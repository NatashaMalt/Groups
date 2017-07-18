const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const logger = require('morgan');
const Promise = require('bluebird');
const nodemailer = require('nodemailer');
require('dotenv').config();

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
      user: process.env.NODE_MAILER_EMAIL,
      pass: process.env.NODE_MAILER_PASS,
  }
});

// setup email data with unicode symbols


const app = express();
// Log activity
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.set('port', (process.env.PORT || 3030));
app.use(express.static('public/startbootstrap-stylish-portfolio-gh-pages'));
app.use(express.static('node_modules'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.sendFile('./public/startbootstrap-stylish-portfolio-gh-pages/index.html');
})

app.get('/about', (req, res) => {
  res.sendFile('login.html', {root: './public/startbootstrap-stylish-portfolio-gh-pages/'});
});

app.get('/chat', (req, res) => {
  
  res.sendFile('chat.html', {root: './public/startbootstrap-stylish-portfolio-gh-pages/'});
})

app.post("/api/send_email", (req, res) => {
  //console.log("request.body is >>>", req.body);
  const { name, email } = req.body;
  console.log("here in the api>>>, req.body is >>>", req.body);
  
  let mailOptions = {
      from: '"Test User" <groupapp4you@gmail.com>', // sender address
      to: ''+ email, // list of receivers
      subject: 'Welcome !', // Subject line
      text: `Hi, welcome ${name} !`,
      html: `<b>Hi, welcome ${name} !</b>` // html body
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if(error) {
      console.log("error is >>>", error);
      res.send(500);
    } else {
      console.log("info is>>>", info);
      console.log('Message sent: ' + info.response);
      res.send(200); 
    }
  });
  
  
})


app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
