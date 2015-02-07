var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/image-ranker');

var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var ImageInfoSchema = new Schema({
	hash : String,
	width : Number,
	height : Number,
	colors : Number,
	size: Number,
	name: String,
	score: Number
});

var ImageInfo = mongoose.model('imageInfo', ImageInfoSchema);

exports.ImageInfo = ImageInfo;

exports.close = mongoose.connection.close;