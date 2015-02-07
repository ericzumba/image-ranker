#!/usr/bin/env node

var ranker = require('./image-ranker');
var fs = require('fs');

var dir = 'public/images/';

var files = fs.readdirSync(dir);

files.forEach(function(filename, index, something) {
	console.log('arquivo: ' + filename);
	ranker.rank(dir + filename);
});

