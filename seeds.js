var mongoose = require("mongoose");
var Campground = require('./models/campground');
var Comment = require('./models/comment');

//Sample Data for testing
var data = [
	{
		Campname : "lake lakey",
		image : "https://bustickets.com/wp-content/uploads/2019/05/Most_Beautiful_Camping_Destinations.jpg",
		description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{
		Campname : "Glacier camp",
		image : "https://globalgrasshopper.com/wp-content/uploads/2012/03/Top-10-most-beautiful-places-to-camp-in-europe-	1000x656.jpg",
		description : "blah blah blah"
	},
	{
		Campname : "Manali Camp",
		image : "https://www.liligo.com/travel-edition/wp-content/uploads/sites/41/2017/06/Camping.jpg",
		description : "blah blah blah"
	},
	{
		Campname : "Legit Camp",
		image : "https://yukongoldoutdoors.com/wp-content/uploads/2019/06/camping_tents.0.jpg",
		description : "blah blah blah"
	}
]

//For removing all campgrounds
function seedDB(){
	Campground.deleteMany({},function(err){
		if(err)
			console.log(err);
		else{
			//Can be un-commented to add sample campgrounds with no associated comments
			
			/*console.log("All campgrounds removed succesfully!!");
			data.forEach(function(camp){
				Campground.create(camp,function(err,savedCamp){
					if(err)
						console.log(err)
					else{
						console.log("New Camp Added!!")
					}
				})
			})*/
		}
	})
}

//Return value
module.exports = seedDB;