var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Door = require("./models/door");
var passport = require('passport'); 
var LocalStrategy = require('passport-local').Strategy; 
passport.use(new LocalStrategy( 
  function(username, password, done) { 
    Account.findOne({ username: username }, function (err, user) { 
      if (err) { return done(err); } 
      if (!user) { 
        return done(null, false, { message: 'Incorrect username.' }); 
      } 
      if (!user.validPassword(password)) { 
        return done(null, false, { message: 'Incorrect password.' }); 
      } 
      return done(null, user); 
    }); 
  }));

require('dotenv').config();
const connectionString =
  process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connectionerror:'));
db.once("open", function () {
  console.log("Connection to DB succeeded")
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var doorRouter = require('./routes/door');
var gridbulidRouter = require('./routes/gridbulid');
var selectorRouter = require('./routes/selector')
var resourceRouter = require('./routes/resource')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({ 
  secret: 'keyboard cat', 
  resave: false, 
  saveUninitialized: false 
})); 
app.use(passport.initialize()); 
app.use(passport.session()); 
var Account =require('./models/account'); 

passport.use(new LocalStrategy(Account.authenticate())); 
passport.serializeUser(Account.serializeUser()); 
passport.deserializeUser(Account.deserializeUser()); 

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/door',doorRouter);
app.use('/gridbulid',gridbulidRouter);
app.use('/selector',selectorRouter);
app.use('/resource',resourceRouter);

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
async function recreateDB() {
  // Delete everything
  await Door.deleteMany();
  let instance1 = new
    Door({
      Door_Name: "philphs", 
      Door_company: "Woodland",
      Door_size:12
    });
  let instance2 = new
    Door({
       Door_Name: "hughes",
       Door_company: "woodfarm",
       Door_size: 13
      });
  let instance3 = new
    Door({
       Door_Name: "hardend", 
       Door_company: "Premier Doors", 
       Door_size: 15});
  instance1.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("First Object saved")
  });
  instance2.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Secound Object saved")
  });
  instance3.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("3rd Object saved")
  });
}
let reseed = true;
if (reseed) { recreateDB(); }


module.exports = app;
