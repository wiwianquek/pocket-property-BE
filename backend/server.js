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
var resaledataRouter = require('./routes/resaledata');
var resalesummaryRoutes = require('./routes/resalesummary');

// Load environment variables
require("dotenv").config();

// Connect to MongoDB or any database you use
require("./client/mongo");

var app = express();

// Define CORS options
const corsOptions = {
  origin: 'https://pocket-property.onrender.com', // Ensure this matches your frontend's exact URL
  optionsSuccessStatus: 200, // For legacy browser support
  credentials: true // If your frontend needs to send credentials like cookies or auth headers
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

// Security middleware, if it's used for checking JWT it should be after CORS setup
app.use(securityMiddleware.checkJWT);

//Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/notes', notesRouter);
app.use('/card', cardRouter);
app.use('/resaledata', resaledataRouter);
app.use('/resalesummary', resalesummaryRoutes);

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

