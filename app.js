var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var methodOverride = require('method-override');
var session = require('express-session');

var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('Quiz 2015'));
app.use(session({
    secret: 'secreto',
    resave: true,
    rolling: true,
    saveUninitialized: false
}));
//app.use(session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(partials());

app.use(function(req, res, next){
    if(req.session.user){
        //console.log("Sesión activa: " + req.session.user.username);
        req.session.anterior = req.session.anterior || (new Date()).getTime();
        
        if(  ( (new Date()).getTime() - req.session.anterior) > 120000 ) {
            //console.log("Cerrando sesión de: " + req.session.user.username + " por inactividad");
            delete req.session.user;   
            req.session.user = null;
            req.session.anterior = null;
            //res.redirect(req.session.redir.toString());
            res.redirect("/login");
        }
        else{
            req.session.anterior = (new Date()).getTime()   
        }
        
    }
    next();
}
        );

app.use(function(req, res, next){
    
    if(!req.session.redir){
        req.session.redir = "/";    
    }
    if(!req.path.match(/\/login|\/logout/)){
        req.session.redir = req.path;   
    }


    res.locals.session = req.session;
    next();
} );



//app.use('/users', users);

app.use('/', routes);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
            , errors: []
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
        , errors: []
    });
});


module.exports = app;
