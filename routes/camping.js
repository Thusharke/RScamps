var express = require('express');
var router = express.Router();
var middleware = require("../middleware");//For checking Ownerships of comments and campgrounds

// For extracting Campground model
var Campground = require('../models/campground');

//Landing page
router.get("/",function(req,res){
	res.render("landing");
})

// ========== RESTFUL ROUTES =========

//1.index - which shows all campgrounds
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

//2.new - which renders  form to add new campgrounds
router.get("/camping/new",middleware.isLoggedIn,function(req,res){
	res.render("./campground/new");
})

//3.create - takes in data from the form and adds into index page
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

//4.show - show additonal information about each campground
router.get("/campground/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,campground){
		if(err)
			console.log("something went wrong!!")
		else{
			res.render("./campground/show",{camp : campground})
		}
	})
})

//5.Edit routes
router.get("/campground/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findById(req.params.id,function(err,camp){
		if(err)
			console.log(err);
		else
		res.render("./campground/edit",{camp : camp});
	})

})

//6.Update route
router.put("/campground/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndUpdate(req.params.id,req.body.camp,function(err,camp){
		if(err)
			console.log(err);
		else
		res.redirect("/campground/" + req.params.id);
	})

})

//7.Destroy route
router.delete("/campground/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		res.redirect("/camping");
	})
})


module.exports = router;