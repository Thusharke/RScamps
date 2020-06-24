//For extracting models
var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

//Checking weather the user owns the Campgoround
middlewareObj.checkCampgroundOwnership = function checkCampgroundOwnership(req,res,next){
	//Is the user logged in
	if(req.isAuthenticated()){
		//Finding the campground by id
		Campground.findById(req.params.id,function(err,foundCamp){
			if(err)
				res.redirect("back");
			else{
				//If found ,are author and user same
				if(foundCamp.author.id.equals(req.user._id))
					return next();
				else{
					req.flash("error","You don't have permission to do that!!")
					res.redirect("back");
				}
			}
		})
	}else{
		req.flash("error","You need to be logged in to do that!!")
		res.redirect("/login");
	}
}

//Checking weather the user owns the Comment
middlewareObj.checkCommentOwnership = function(req, res, next) {
 //Is the user logged in	
 if(req.isAuthenticated()){
	    //Finding the comment by id
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
                //If found ,are author and user same
				if(foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

//Checking weather the user is Logged in
middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
	req.flash("error","Please login first!!")
    res.redirect("/login");
}

//return the "middlewareObj" object
module.exports = middlewareObj;