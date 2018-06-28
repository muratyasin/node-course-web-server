const express = require ('express');

const hbs = require ('hbs');

const fs = require ('fs');

var app = express();

hbs.registerPartials(__dirname +'/views/partials');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
});

app.set('view engine', 'hbs');


app.use( (req, res, next)=>{
  var now = new Date().toString();
  var log =  (`${now}: ${req.method} ${req.url}`);
  console.log(log);

  fs.appendFile('server.log',log+'\n',(err)=>{
    if (err) {
      console.log('unable to append to server log');
    }
  });
  next();
});

// app.use((req,res,next) =>{
//     res.render('maintanance.hbs');
// });

app.use(express.static(__dirname +'/public'));


app.get('/', (req,res) =>{

  //res.send('<h1>Hello Express!</h1>');
  res.render ('home.hbs', {
    welcomeMsg: 'Welcome to my website',
    pageTitle : 'Home Page'
    });

});


app.get('/about', (req,res) =>{
    res.render('about.hbs', {
      pageTitle : 'About Page'
    });

})

app.get('/error', (req,res) =>{

  //res.send('<h1>Hello Express!</h1>');
  res.send ({
    errorMessage: 'unable to handle request',

  });

});

app.listen(3000, () => {
  console.log('Server up is up on port 3000');
});
