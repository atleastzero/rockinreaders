const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

require('dotenv').config();

var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
app.use( bodyParser.urlencoded({ extended: true }) );

var configDB = require('./data/rockin-db.js');

mongoose.connect(configDB.url);

require('./config/passport')(passport);

app.use(morgan('dev')); 
app.use(cookieParser());
app.use(bodyParser()); 

app.set('view engine', 'hbs');
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));

app.use(express.static(__dirname + '/public'));

app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());

app.use(function(req, res, next){
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});

require('./app/routes.js')(app, passport);

const port = process.env.PORT || 3000;

app.listen(port);