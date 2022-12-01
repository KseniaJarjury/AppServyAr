const express = require('express');
const path = require('path');
const passport = require('passport');
const PORT = process.env.PORT || 3000;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const dotenv = require('dotenv');

dotenv.config();


// Intializations
const app = express();
const db = require('./config/db');
app.get('/cool', (req, res) => res.send(cool()));
app.get('/times', (req, res) => res.send(showTimes()));
showTimes = () => {
  let result = '';
  const times = process.env.TIMES || 5;
  for (i = 0; i < times; i++) {
    result += i + ' ';
  }
  return result;
}


app.use(cookieParser('secret'));
app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'woot',
  resave: false,
  saveUninitialized: false,
}));

// setup forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// passport
app.use(passport.initialize());
app.use(passport.session());

// middlewares
const {authUserMiddleware} = require('./middlewares/auth');
app.use(authUserMiddleware);

app.use(flash());
const { flashMiddleware, flashHelpersMiddleware } = require('./middlewares/flash');
app.use(flashMiddleware);
app.use(flashHelpersMiddleware);

// public files
app.use(express.static(path.join(__dirname, './public')));

// routes
app.use('/', require('./routes/public'));
app.use('/', require('./routes/private'));


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
});


  
