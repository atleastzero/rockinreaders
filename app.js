const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
require('dotenv').config()
const expressSession = require('express-session')({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
})
const passport = require('passport')
const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const connectEnsureLogin = require('connect-ensure-login')

mongoose.set('useCreateIndex', true);

app.set('view engine', 'hbs')
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))

app.use(express.static(__dirname + '/public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressSession)

app.use(passport.initialize())
app.use(passport.session())

mongoose.connect('mongodb://localhost/MyDatabase',
  { useNewUrlParser: true, useUnifiedTopology: true })

const Schema = mongoose.Schema;
const UserDetail = new Schema({
  email: String,
  password: String,
  firstName: String, 
  lastName: String
})

UserDetail.plugin(passportLocalMongoose)
const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo')

passport.use(UserDetails.createStrategy())

passport.serializeUser(UserDetails.serializeUser())
passport.deserializeUser(UserDetails.deserializeUser())

app.get('/', (req, res) => {
  res.render('home')
})

app.post('/login', (req, res, next) => {
  passport.authenticate('local',
    (err, user, info) => {
      if (err) {
        return next(err)
      }

      if (!user) {
        return res.render('/login?info=' + info)
      }

      req.logIn(user, function(err) {
        if (err) {
          return next(err)
        }

        return res.render('/')
      });

  })(req, res, next)
})

app.get('/login',
  (req, res) => res.render('login')
)

app.get('/private',
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) => res.render('private')
)

app.get('/user',
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) => res.send({user: req.user})
)

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/reading-levels', (req, res) => {
  res.render('reading-levels')
})

app.get('/cool-cats', (req, res) => {
  res.render('cool-cats')
})

app.get('/rockin-rollers', (req, res) => {
  res.render('rockin-rollers')
})

app.get('/rock-stars', (req, res) => {
  res.render('rock-stars')
})

app.get('/super-stars', (req, res) => {
  res.render('super-stars')
})

app.get('/mega-stars', (req, res) => {
  res.render('mega-stars')
})

app.get('/rock-legends', (req, res) => {
  res.render('rock-legends')
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Example app listening at port ${port}`))