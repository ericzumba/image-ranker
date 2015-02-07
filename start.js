var fs = require('fs')
, pixelr = require('pixelr')
, colors = require('./node_modules/blessed/lib/colors');;

var images = fs.readdirSync('images/');


// images.forEach(function(image, index, images) {
// 	pixelr.read("image.jpeg", "jpeg", printa);
// 	console.log(image);
// })

console.log(images[0]);
pixelr.read('images/' + images[0], "jpeg", asciizeImage);

function printa(err, img) {
	if (err) { console.log(err); return; }
	console.log(img);
}



function asciizeImage(err, image) {
	if (err) { console.log(err); return; }
	var occurrences = countPixels(image);
	for ( i = 0; i < occurrences.length; i++) {
		console.log((i+1) + "," + occurrences[i]);
	}
	//console.log(  asciize(image, 870, 653) );
}

function asciize(image, asciiWidth, asciiHeight) {
	var countedColors = countColors(image, asciiWidth, asciiHeight)
	, ascii = ''
	, ansiColorCode
	, previousColor = -2;
	return countedColors;

	for (var i = 0; i < countedColors.length; i++) {
		ansiColorCode = sortColors(countedColors[i])[0].color;
		if (ansiColorCode !== previousColor) {
			ascii += '\033[38;5;' + ansiColorCode + 'm';
			previousColor = ansiColorCode;
		}
		ascii += '#';
	}

	return ascii + '\033[0m';
}

function sortColors(countedColors) {
	var sortedColors = []
	, color;

	for (color in countedColors) {
		sortedColors.push({'color': color, 'count': countedColors[color]});
	}
	return sortedColors.sort(s);

	function s(a, b) {
		if (a.count < b.count) {
			return 1;
		} else if (a.count > b.count) {
			return -1;
		}
		return 0;
	}
}

function countColors(image, asciiWidth, asciiHeight) {
	var colorCount = []
	, blockWidth  = image.width / asciiWidth
	, blockHeight = image.height / asciiHeight
	, index = 0
	, pixelIndex
	, pixelColor;

	for (var i = 0; i < image.pixels.length; i += 3) {
		pixelIndex = i / 3;
		index = Math.floor(pixelIndex / blockWidth) % asciiWidth + 
		Math.floor(pixelIndex / image.width / blockHeight) * asciiWidth;
		console.log(index);
		if (!colorCount[index]) {
			colorCount[index] = {};
		}
		pixelColor = colors.match(image.pixels[i], image.pixels[i + 1], image.pixels[i + 2]);
		if (!(pixelColor in colorCount[index])) {
			colorCount[index][pixelColor] = 0;
		}
    // Assign less weight to grayscale values for a more interesting picture
    if (pixelColor >= 232 || pixelColor === 59) {
    	colorCount[index][pixelColor] += .5;
    } else {
    	colorCount[index][pixelColor]++;
    }
}

return colorCount;
}


function countPixels(img) {
	var output = [], color, colors = [];

	for (var i = 255 ; i >= 0; i--) {
		output[i] = 0;
	};
	for (var i = 0; i < img.pixels.length; ) {
		color = 0.21 * img.pixels[i++] + 0.72 * img.pixels[i++] + 0.07 * img.pixels[i++];
		colors.push(color);
		colors.push(color);
		colors.push(color);
		output[parseInt(color)]++;
	}
	return output;
}