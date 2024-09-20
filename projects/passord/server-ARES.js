const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./schemas/user');


// express app
const app = express();

// connect to mongodb & listen for requests
const url = "mongodb://localhost:27017";

mongoose.connect(url, {dbName: "userDatabase" })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.render('login', { title: 'Login' } );
});

app.get('/register', (req, res) => {
  res.render('register', { title: 'Register' } );
});

app.get('/welcome', (req, res) => {
  res.render('welcome', { title: 'Welcome' } );
});

app.post('/register', (req, res) => {
  let email;
  let password;

  if (req.body.password === req.body.confirmPassword) {
    email = req.body.email;
    password = req.body.password;
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
          const user = new User({
            role: "kunde", email: email, password: hash
          })
          user.save()
          .then(result => {
            console.log('User created');
          })
          .catch(err => console.log(err));
          console.log(user)
          console.log(hash)
      });
  });
    console.log(email, password);
  } else {
    console.log('Passwords do not match');
  }
  res.redirect('/');
});

app.post('/', (req, res) => {
  console.log(req.body.email, req.body.password);
  User.findOne({ email: req.body.email })
    .then(user => {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.redirect('/welcome');
      } else {
        res.status(401).json({ error: 'Incorrect email or password. Please try again.' });
      }
    })
    .catch(err => console.log(err));
});

app.get('*', (req, res) => {
  res.render('404', { title: '404' } );
});