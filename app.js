var express = require('express');
var app = express();
var request = require('request');
//var bodyParser = require('body-parser');
app.set('view engine', 'pug');
app.set('views', './views');
var names = require('./names.js');
app.use('/api/names', names);
//app.use(bodyParser.urlencoded({
	//extended: true
//}))
//app.use(bodyParser.json())
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'))
require('es6-promise').polyfill();
require('isomorphic-fetch');

var namesArr = ["John Smith", "Jane Doe", "Anita Mendoza", "George Johnson", "John Williams"];

app.get('/', function(req, res) {
	fetch('http://localhost:8000/api/names')
		 .then((resp) => resp.json())
		 .then(function(data) {
		 	res.render('index', {json: data});
		 })
		 .catch(function(error) {
		   console.log(error);
		 });
})

app.get('/api/names/:search?', function(req, res) {
	if (req.query.search) {
		var results = [];
		for (var i = 0; i < namesArr.length; i++) {
			var nameSplit = namesArr[i].split(" ");
			for (var j = 0; j < nameSplit.length; j++) {
				if (req.query.search == nameSplit[j]) {
					results.push(namesArr[i]);
				}
			}
		}
		res.json(results);
	}
	else {
		res.json(namesArr);
	}
})

module.exports = app;
app.listen(8000, function () {
  console.log('listening on port 8000!')
})
