var express = require('express');
var router = express.Router();
var ImageInfo = require('../mongo').ImageInfo;

router.get('/', function(req, res, next) {

	console.log('---->>> sort: ' + sort);
	var sort = req.query.sort;
	if(sort == null) {
		sort = 'hash';
	}

	console.log('---->>> sort: ' + sort);
	
	ImageInfo.find().sort('-' + sort).exec(function(err, list) {
		res.render('index', {
			list: list,
			show: req.query.show
		});
	});

});

module.exports = router;
