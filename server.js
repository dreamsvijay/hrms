var env = process.env.NODE_ENV || 'development';
var config = require('./dbConfig')[env];

var express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	morgan = require('morgan'),
	restful = require('node-restful'),
	mongo = require("mongoose");

var app = express();


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


var db = mongo.connect("mongodb://" + config.database.host + ":" + config.database.port + "/" + config.database.db, function (err, response) {
    if (err) { console.log(err); }
    else { console.log('Connected to ' + db, ' + ', response); }
});

var user = restful.model('users', mongo.Schema({name:String, email:String, password:String}));
var userResource = app.resource = user.methods(['get', 'post', 'put', 'delete']);

userResource.route('signup', function(req, res, next){
	status = false;
	params = req.body;
	
	if ( params.email && params.password ) {

		  var userData = {
		    name: params.name,
		    email: params.email,
		    password: params.password,
		  }
	
		  //use schema.create to insert data into the db
		  status = user.create(userData, function(err, users) {
		    if (!err) {
		    	status = users;
		    }
		    res.send(status);
		  });
	}
	else {
		res.send(status);
	}
});

userResource.route('login', function(req, res, next){
	status = false;
	params = req.body;

	if ( params.email && params.password ) {

		  var userData = {
		    email: params.email,
		    password: params.password,
		  }
	
		  //use schema.create to insert data into the db
		  user.findOne(userData, function(err, users) {
		    if ( !err && (users!= null) ) {
		    	status = users;
		    }
		    res.send(status);
		  });
	}
	else {
		res.send(status);
	}
});

userResource.register(app, '/users');

app.listen(8080, function () {
    console.log('HRMS API server listening on port 8080!')
})