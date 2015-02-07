#!/usr/bin/env node

var ranker = require('./image-ranker');
var fs = require('fs');

var files = fs.readdirSync('sample/');

files.forEach(function(filename, index, something) {
	console.log('arquivo: ' + filename);
	ranker.rank('sample/' + filename);
});

