var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
global.connectPool = require('./config/db.js');
global.nodeSiteUrl = 'http://192.168.1.151:8083'; // node
global.nodeAdminUrl = 'http://192.168.1.151:8083/admin'; // node
global.siteTitle = 'cApp Admin';
global.successStatus = 200;
global.failStatus = 401;
global.SessionExpireStatus = 500;
global.CURRENCY = '$';
var apiRouter = require('./routes/api');
// const dotenv = require('dotenv');
// dotenv.config();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', apiRouter);

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

var server = app.listen(8080, function () {
  console.log("Example app listening at http://192.168.1.151:%s", server.address().port);
});

module.exports = app;
