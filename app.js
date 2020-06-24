//requiring installed packages
var express = require('express');
var app = express();
var flash = require("connect-flash");
var bodyparser = require('body-parser');
var mongoose = require("mongoose");
var methodOverride = require('method-override');
var seedDB = require("./seeds");
var passport = require('passport');
var LocalStrategy = require('passport-local');

app.set("view engine","ejs");

//requiring all the routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/camping"),
    indexRoutes      = require("./routes/auth")

//This function below can be un-commented if you want clear the database
//seedDB(); 

//Connecting to Database
var url = process.env.DATABASEURL || "mongodb://localhost/Yelp_camp";
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true});

//Extracting the models
Campground = require("./models/campground");
Comment = require("./models/comment")
User = require("./models/user");

//Using the required packages
app.use(flash());
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(bodyparser.urlencoded({extended : true}));

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

//For passing in these variables to every route
app.use(function(req, res, next){
   res.locals.currUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

//running all the routes
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

//To start the website server
app.listen(process.env.PORT,process.env.ID,function(req,res){
	console.log("The Yelp camp server has started!!");
})