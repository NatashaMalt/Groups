const express = require('express');
const bodyParser = require("body-parser");
const logger = require('morgan');
const Promise = require('bluebird');
const api_key = 'key-f0bca95dfb44431f619d3f0449e92306';
const domain_name = 'sandbox69de68c65a51418cb9bdc770bb2a648d.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain_name});

const app = express();
// Log activity
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.set('port', (process.env.PORT || 3030));
app.use(express.static('public/startbootstrap-stylish-portfolio-gh-pages'));

app.post("/api/send_email", (req, res) => {
  //console.log("request.body is >>>", req.body);
  const { name, email } = req.body;
  console.log("here in the api>>>, req.body is >>>", req.body);
  let data = {
    from: 'sevenlist0110@gmail.com',
    to: email,
    subject: 'Welcome !',
    text: `Hi, welcome ${name} !`
  };
  
  mailgun.messages().send(data, function (error, body) {
    if (error) {
      console.log('sending email error>>>', error);
      res.end(500);
    }
    res.json('ok');
  });
  
})


app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
