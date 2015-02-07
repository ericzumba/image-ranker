var fs = require('fs'); 
var gm = require('gm');
var dhash = require('dhash');
var mongo = require('./mongo.js');

exports.rank = function(img) {
	
	var info = new mongo.ImageInfo({});

	var result = {
			resolution : 0,
			color : 0,
			filesize : 0,
		};

		function max10(value) {
			return value > 10 ? 10 : value;
		}

		function resolution(err, size) {
			if (err) {
				console.log(err);
				return;
			}
			
			info.width = size.width;
			info.height = size.height;
			
			var _size = Math.sqrt(size.width * size.height);
			_size = _size / 1280 * 10;

			result.resolution = max10(_size);

			gm(img).color(color);
		}

		function color(err, value) {
			if (err) 
				return;

			var _color = value / 1024 * 10;
			info.colors = value;
			result.color = max10(_color);
			
			dhash(img, makeDhash, 4 );
		}

		//gm(img).depth(depth);
		function filesize(img) {
			var size = fs.statSync(img).size;
			var _filesize = size / 1024;
			info.size = size;
			result.filesize = Math.min(1, _filesize / 25) * 10;
		}

		function makeDhash(err, hash) {
			
			info.hash = hash;
			finalize();
		}


		function finalize() {
			console.log('result: ' + JSON.stringify(result));
			
			var score = result.resolution * .6 + result.color * .2 + result.filesize * .2;
			
			console.log('resu:' + JSON.stringify(result));
			console.log('info: ' + JSON.stringify(info));
			console.log('Score: ' + score);
			info.score = score;
			info.save();
			mongo.close();
		}
	info.name = img;
	img = img;
	filesize(img);
	gm(img).size(resolution);
}


