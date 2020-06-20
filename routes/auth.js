var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var middleware = require("../middleware");
router.get("/register",function(req,res){
	res.render("register");
})
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


//login
router.get("/login",function(req,res){
	res.render("login");
})
router.post("/login",passport.authenticate("local",{
	successRedirect : "/camping",
	failureRedirect : "/login"
}),function(req,res){	
})

//logout
router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","LOGGED YOU OUT!!!")
	res.redirect("/camping");
})

module.exports = router;