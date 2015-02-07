var pHash = require("phash");
var readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


rl.on('line', function(line){
	var hashA = pHash.imageHashSync(line);
	console.log(hashA);
})

