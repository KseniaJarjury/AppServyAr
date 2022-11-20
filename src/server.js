const express = require('express');
const path = require('path');
const ejs = require('ejs');
const app = express();
const port = process.env.PORT || 3000;

const dotenv = require('dotenv');
dotenv.config();

const db = require('./config/db');


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
const { flashMiddleware, flashHelpersMiddleware } = require('./middlewares/flash');
app.use(flashMiddleware);
app.use(flashHelpersMiddleware);

// public files
app.use(express.static(path.join(__dirname, './public')));

const { authUserMiddleware } = require('./middlewares/auth');
app.use(authUserMiddleware);

// routes

app.use('/', require('./routes/index'));
app.use('/registro', require('./routes/registro'));
app.use('/cliente', require('./routes/cliente'));
app.use('/contrato', require('./routes/contrato'));
app.use('/rol', require('./routes/rol'));
app.use('/oferente', require('./routes/oferente'));
app.use('/editarperfil', require('./routes/editarperfil'));
app.use('/contratooferente', require('./routes/contratooferente'));
app.use('/formcontratacion', require('./routes/formcontratacion'));
app.use('/perfiloferente', require('./routes/perfiloferente'));

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
