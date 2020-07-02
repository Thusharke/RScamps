var mongoose = require('mongoose');
var CampgroundSchema =new mongoose.Schema({
	Campname : String,
	image : String,
	description : String,
	price : Number,
	author : {
		id : {
			type : mongoose.Schema.Types.ObjectId,
         	ref : "Comment"
		},
		username : String
	},
	comments : [
		{
			type : mongoose.Schema.Types.ObjectId,
         	ref : "Comment"
		}
	]
});
module.exports = mongoose.model("Campground",CampgroundSchema);