const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');

const app =  express();
const port = process.env.PORT || 3000;

const Files = require('./models/file');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://guru:guru100@ds261440.mlab.com:61440/interns');
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug')

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use(express.static(path.join(__dirname,'public')));

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

app.get('/',ensureAuthenticated,(req,res)=>{
  Files.find({},(err,files)=>{
    //console.log(files);
    res.render('home',{files});
  });
})

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/user/login');
  }
}

const user = require('./routes/user');
app.use('/user',user);

const file = require('./routes/file');
app.use('/file',file);
	
app.listen(port,()=>{
	console.log(`Server is up on port ${port}`);
});
