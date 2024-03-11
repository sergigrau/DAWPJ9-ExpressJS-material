var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');

// connexio BDs
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongodb://127.0.0.1:27017/alumnes');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', routes.index);

app.get('/salutacio', routes.salutacio);
app.get('/llistarAlumnes', routes.llistarAlumnes(db));
app.get('/afegirAlumne', routes.afegirAlumne);
app.get('/modificarAlumne', routes.modificarAlumne);
app.get('/esborrarAlumne', routes.esborrarAlumne);

app.post('/afegirAlumneBD', routes.afegirAlumneBD(db));
app.post('/modificarAlumneBD', routes.modificarAlumneBD(db));
app.post('/esborrarAlumneBD', routes.esborrarAlumneBD(db));

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});



module.exports = app;
