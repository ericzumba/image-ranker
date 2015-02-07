var express = require('express');
var router = express.Router();
var ImageInfo = require('../mongo').ImageInfo;

/* GET home page. */
router.get('/', function(req, res, next) {

	ImageInfo.find(function(err, list) {

		console.log('a lista: ' + list)
		
		res.render('index', {
			title : 'Express',
			list: list
		});
	});

});

module.exports = router;
