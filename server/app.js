const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const database = require('./db/database');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const apiRouter = require('./routes/api/api');
const apiTaskRouter = require('./routes/api/taks');

var app = express();

// making connection to db
database.connect().then(async (conn) => { 
  // console.log(await conn.collections.projects.dropIndexes());
  console.log("Connected to the database...");
});

const corsOptions = {
  methods: "POST, PUT, OPTIONS, DELETE, GET",
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/api', apiRouter); // Dashboard
app.use('/api', apiTaskRouter); // project/Task

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
});

module.exports = app;
