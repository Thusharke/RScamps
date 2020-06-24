var express = require('express');
var router = express.Router();
var passport = require('passport');

//Extracting User model
var User = require('../models/user');

// ======== Register routes =========

//renders Register form
router.get("/register",function(req,res){
	res.render("register");
})
//creates new User
router.post("/register",function(req,res){
	var newUser = new User({username : req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			req.flash("error",err.message);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success","Welcome to Yelpcamp " + user.username);
			res.redirect("/camping");
		})
	})
	
})

// ======== Login routes =========

//renders Login form
router.get("/login",function(req,res){
	res.render("login");
})
//If the details authenticate then logs you in.
router.post("/login",passport.authenticate("local",{
	successRedirect : "/camping",
	failureRedirect : "/login"
}),function(req,res){	
})

// ======== Logout routes =========

//logs you out
router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","LOGGED YOU OUT!!!")
	res.redirect("/camping");
})

//return values
module.exports = router;