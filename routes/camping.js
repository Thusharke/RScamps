var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require("../middleware");
router.get("/",function(req,res){
	res.render("landing");
})

//index - which shows all campgrounds
router.get("/camping",function(req,res){
	Campground.find({},function(err,campgrounds){
		if(err)
			console.log(err);
		else{
			console.log(req.user);
			res.render("./campground/index",{camps : campgrounds});
		}
	})
})

//new - which renders  form to add new campgrounds
router.get("/camping/new",middleware.isLoggedIn,function(req,res){
	res.render("./campground/new");
})

//create - takes in data from the form and adds into index page
router.post("/camping",middleware.isLoggedIn,function(req,res){
	console.log(req.user);
	Campground.create({
	Campname: req.body.campName,
	image: req.body.campURL,
	author : {id : req.user._id , username : req.user.username},
	description : req.body.campDesc	
	},function(err,camp){
		if(err){
			console.log(err);
		}else{
			console.log(camp);
		    console.log("A NEW CAMP HAS BEEN ADDED");
			res.redirect("/camping");
		}
	});
})

//show - show additonal information about each campground
router.get("/campground/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,campground){
		if(err)
			console.log("something went wrong!!")
		else{
			res.render("./campground/show",{camp : campground})
		}
	})
})

//Edit routes
router.get("/campground/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findById(req.params.id,function(err,camp){
		if(err)
			console.log(err);
		else
		res.render("./campground/edit",{camp : camp});
	})

})
//Update route
router.put("/campground/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndUpdate(req.params.id,req.body.camp,function(err,camp){
		if(err)
			console.log(err);
		else
		res.redirect("/campground/" + req.params.id);
	})

})
//Destroy router
router.delete("/campground/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		res.redirect("/camping");
	})

})


module.exports = router;