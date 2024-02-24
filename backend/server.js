var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var securityMiddleware = require('./middlewares/security');

//Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var notesRouter = require('./routes/notes');
var cardRouter = require('./routes/card');

// Load environment variables
require("dotenv").config();

// Connect to MongoDB or any database you use
require("./client/mongo");

var app = express();

// Define CORS options
const corsOptions = {
  origin: 'http://localhost:5173', // Ensure this matches your frontend's exact URL
  optionsSuccessStatus: 200 // For legacy browser support
};

// Apply CORS with the options
app.use(cors(corsOptions));

// Enable preflight requests for all routes
app.options('*', cors(corsOptions)); // This will handle preflight requests

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS Middleware setup
app.use(cors({ origin: 'http://localhost:3000/' })); // Enable CORS for the frontend app

// Enable preflight requests for all routes
app.options('*', cors({ origin: 'http://localhost:3000/' })); // This handles preflight requests

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Security middleware, if it's used for checking JWT it should be after CORS setup
app.use(securityMiddleware.checkJWT);

//Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/notes', notesRouter);
app.use('/card', cardRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
