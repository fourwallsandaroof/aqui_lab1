const fetch = require('node-fetch');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.listen(3001, () => console.log('cool 3001'))

var price;

fetch('https://api.estadisticasbcra.com/usd_of_minorista',{
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'BEARER eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTc3NzYzMDksInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJhcXVpbGVzXzEwMDlAaG90bWFpbC5jb20ifQ.Lu_lK0MAobv_RNcUryxKH9jC1wqkg7TXQ4E6UVWNz5gQ5jU9f3oFYSdW9C7sSe552dQWCSSN0ctJUJDMzXL_qA' }
    })
    .then(res => res.json())
    .then(json => {
      price = json[json.length - 1].v
      return console.log(price);
    });

// i get price is not defined 😭
//app.get('/', (request, response) => {
  //response.send(price);
//});

//app.post('/', (request, response) => {
  //response.send(price);
//});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
