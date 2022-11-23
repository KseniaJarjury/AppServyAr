const express = require('express');
const cool = require('cool-ascii-faces');
const path = require('path');
const passport = require('passport');
const PORT = process.env.PORT || 3000;

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

const session = require('express-session');
const cookieParser = require('cookie-parser');
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

let flash = require('connect-flash');
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
const { flashMiddleware, flashHelpersMiddleware } = require('./middlewares/flash');
app.use(flashMiddleware);
app.use(flashHelpersMiddleware);

// public files
app.use(express.static(path.join(__dirname, './public')));
const { authUserMiddleware } = require('./middlewares/auth');
app.use(authUserMiddleware);

// routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/auth'));
// app.use('/', require('./routes/authentication'));
app.use('/', require('./routes/registro'));
app.use('/', require('./routes/cliente'));
app.use('/', require('./routes/contrato'));
app.use('/', require('./routes/rol'));
app.use('/', require('./routes/oferente'));
app.use('/', require('./routes/editarperfil'));
app.use('/', require('./routes/contratooferente'));
app.use('/', require('./routes/formcontratacion'));
app.use('/', require('./routes/perfiloferente'));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
});


  
