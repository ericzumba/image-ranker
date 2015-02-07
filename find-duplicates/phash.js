var pHash = require("phash");
var readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var hashes = [];

var compare = function(hashA, hashB) {
  var a = {};
  a[hashB.file] = pHash.hammingDistance(hashA.hash, hashB.hash)  
  hashA.diff.push(a);
}

rl.on('line', function(line){
	var hash = { 
    file: line, 
    hash: pHash.imageHashSync(line),
    diff: []
  }
  for(var i = 0; i < hashes.length; i++) {
    compare(hash, hashes[i]);
  }
  console.log(hash);
  hashes.push(hash);
})
