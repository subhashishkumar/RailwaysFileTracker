const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const router = express.Router();

const User = require('../models/user');
	
router.get('/login',(req,res)=>{
	res.render('login');
})

passport.use(new LocalStrategy(function(username, password, done){
    var query = {email:username};
    User.findOne(query,(err, user)=>{
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'No user found'});
      }
      // console.log(password);
      // console.log(user.password);
      bcrypt.compare(password, user.password,(err, isMatch)=>{
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message: 'Wrong password'});
        }
      });
    });
  }));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
	  done(err, user);
	});
});

router.post('/login',
	passport.authenticate('local',{successRedirect:'/user/home',failureRedirect:'/user/login',failureFlash:true}),
	(req,res)=>{
		res.redirect('/user/home')
	})

router.get('/signup',(req,res)=>{
	res.render('signup');
})

router.post('/signup',(req,res)=>{
	if(req.body.secretKey.toString() == 'guru')
	{
		//console.log("match");
		var newUser = User();
		newUser.email = req.body.email
		newUser.username = req.body.username;
		bcrypt.genSalt(10,(err,salt)=>{
			if(err) throw err;
			bcrypt.hash(req.body.password,salt,(err,hash)=>{
				if(err) throw err;
				newUser.password = hash;
				newUser.save();
				res.redirect('/user/login');
			});
		})
	}
	else
	{
		//console.log("does not match");
		res.redirect('/user/signup');

	}

})

router.get('/logout',(req,res)=>{
	req.logout();
	res.redirect('/user/login');
})

module.exports = router;

