var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var Comment    = require('../models/comment');
var middleware = require("../middleware");
//=========comment routes

// ========= RESTFUL ROUTES ==========

//1.Index - lies in campground show page

//2.new - renders form for creating new comment
router.get("/campground/:id/comment/new",middleware.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		res.render("./comments/new",{camp : campground})
	})
})

//3.create - Creating new comment from the details given by new form
router.post("/campground/:id/comment",function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err)
			console.log(err);
		else{
			Comment.create(req.body.comment,function(err,comment){
				if(err)
					console.log(err);
				else{
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save()
					res.redirect("/campground/"+campground._id)
				}
			})
		}
	})
})

//4.show - lies in the show page of the campground

//5.Edit - render an edit form to edit the comment
router.get("/campground/:id/comment/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
	Comment.findById(req.params.comment_id,function(err,comment){
		res.render("./comments/edit",{camp_id : req.params.id , comment : comment})
	})
})

//6.Update - updates the comment from the details given by edit form
router.put("/campground/:id/comment/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,comment){
		if(err)
			res.redirect("back");
		else
			res.redirect("/campground/" + req.params.id);
	})
})

//7.Delete - deletes the comment
router.delete("/campground/:id/comment/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err)
			res.redirect("back");
		else
			res.redirect("/campground/" + req.params.id);
	})
})


module.exports = router;