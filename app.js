var express = require('express');
var app = express();
var flash = require("connect-flash");
var bodyparser = require('body-parser');
var mongoose = require("mongoose");
var methodOverride = require('method-override');
var seedDB = require("./seeds");
var passport = require('passport');
var LocalStrategy = require('passport-local');
User = require("./models/user");

var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/camping"),
    indexRoutes      = require("./routes/auth")

//seedDB();
mongoose.connect(process.env.DATABASEURL,{useNewUrlParser:true,useUnifiedTopology:true});

Campground = require("./models/campground");
Comment = require("./models/comment")

app.use(flash());
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(bodyparser.urlencoded({extended : true}));
app.set("view engine","ejs");

//Passport Configuration
passport.use(new LocalStrategy(User.authenticate()));
app.use(require("express-session")({
	secret : "This my website!!",
	resave : false,
	saveUninitialized : false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);


app.listen(process.env.PORT,process.env.ID,function(req,res){
	console.log("The Yelp camp server has started!!");
})