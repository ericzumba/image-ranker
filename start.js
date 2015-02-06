var fs = require('fs');

var images = fs.readdirSync('images/');


images.forEach(function(image, index, images) {
	console.log(image);
})