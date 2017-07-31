const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const mongoose     = require('mongoose');
const cors         = require('cors');
const session      = require('express-session');
const passport     = require('passport');
const passportSetup= require('./configs/passport');
const index        = require('./routes/index');
const userRoutes   = require('./routes/users-api');
const cardRoutes   = require('./routes/cards-api');
const authRoutes   = require('./routes/auth-api');

require('./configs/database');
require('dotenv').config();
require('./configs/passport.js');

const app = express();
// app.use(cors({
//   credentials: true,
//   origin: [ 'http://www.cardxchange.co' ]
//   origin: [ 'http://localhost:4200' ]
// }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// default value for title local
app.locals.title = 'cardXchange';

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);
app.use(session({
  secret: 'string to compare hashes from hijacking session',
  resave: true,
  saveUninitialized: true,
  cookie : { httpOnly: true, maxAge: 2419200000 }
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/',    index);
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', cardRoutes);
// app.use('/api', eventRoutes);

//send to index.html if no route matched
app.use((req, res, next) => {
  res.sendfile(__dirname + 'public/index.html');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error   = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
