const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.port || 8080;

const app = express();

app.set('view engine', 'hbs');

app.use((req, res, next) => {
   var now = new Date();
   var log = `${now} ${req.method} ${req.url}`;
   
   console.log(log);
   fs.appendFile('server.log', log + "\n", (err) => {
      if (err) console.log('Unable to write log!');
   });
   next();
});

app.use((req, res, next) => {
   res.render('maintain');
});

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
   res.render('home', {
      greetingMessage: 'Hello on my website!!!',
      pageTitle: 'Home page'
   });
});

app.get('/about', (req, res) => {
   res.render('about', {
      pageTitle: 'About what?'
   }); 
});

app.get('/bad', (req, res) => {
   res.send('TERRRRIBLE!!!!!!!!'); 
});

app.listen(port, () => {
   console.log(`Server is running on port ${port}.`);
});