var createError = require('http-errors');
var express = require('express');
var methodOverride = require('method-override');
var path = require('path');
var logger = require('morgan');

var homeRouter = require('./routes/homeRoute');
var barRouter = require('./routes/barRoutes');
var beerRouter = require('./routes/beerRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

require('./config/database');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));
app.use(methodOverride('_method'));

app.use('/', homeRouter);
app.use('/bars', barRouter);
app.use('/beers', beerRouter);

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

app.listen(3000, function() {
    console.log('The sweet sounds of port 3000...');
});
