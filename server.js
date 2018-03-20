var env = process.env.NODE_ENV || 'development';
var config = require('./dbConfig')[env];

var express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	morgan = require('morgan'),
	restful = require('node-restful'),
	mongo = require("mongoose");

var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

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
    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      //respond with 200
      res.send(200);
    }
    else {
    //move on
      next();
    }
});

app.disable('etag');

var db = mongo.connect("mongodb://" + config.database.host + ":" + config.database.port + "/" + config.database.db, function (err, response) {
    if (err) { console.log(err); }
    else { console.log('Connected to ' + db, ' + ', response); }
});

const Schema = mongo.Schema;
const ObjectId = Schema.Types.ObjectId;

usersSchema = new mongo.Schema({
	email: String,
	password: String,
    first_name: String,
    last_name:String,
	email_id: String,
    birthday: Date,
    addresses: Object,
    contact_numbers: Object,
    gender: String,
    type: String,
    profile_type: String,
    password: String,
    profile_picture: String,
    is_active: Boolean,
    created_by: ObjectId,
    updated_by: ObjectId,
    deleted_by: ObjectId,
    deleted_on: Date
}, {timestamps: true});

//hashing a password before saving it to the database
usersSchema.pre('save', function (next) {
	var users = this;
	bcrypt.hash(users.password, 10, function (err, hash){
	  if (err) {
	    return next(err);
	  }
	  users.password = hash;
	  next();
	})
});

var user = restful.model('users', usersSchema);

var userResource = app.resource = user.methods(['get', 'post', 'put', 'delete']);

userResource.route('signup', function(req, res, next){
	status = false;
	params = req.body;
	
	if ( params.email && ( params.password || params.profile_type ) ) {

		  var userData = {
		    first_name: params.name,
		    email: params.email
		  }
	      
		  if ( params.name ) {
			  userData.first_name = params.name;
		  }
		  
		  if ( params.first_name ) {
			  userData.first_name = params.first_name;
		  }
		  if ( params.last_name ) {
			  userData.last_name = params.last_name;
		  }
		  
		  if( params.profile_type )  {
			userData.profile_type = params.profile_type;
			userData.password = "";
		  }
		  else {
			  userData.password = params.password;
		  }
		  
		  //use schema.create to insert data into the db
		  status = user.create(userData, function(err, users) {
		    if (!err) {
		    	status = { "id": users._id };
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
	//TODO PASSWORD 
	if ( params.email ) {
	
		  //use schema.create to insert data into the db
		  user.findOne({email: params.email}, function(err, users) {
		    if ( !err && (users!= null) ) {
		    		if( bcrypt.compareSync(params.password, users.password) ) {
		    		    // create a token
		    		    var token = jwt.sign({ id: users._id }, config.secret, {
		    		      expiresIn: 3600
		    		    });
		    		    status = { "token": token, "id": users._id };
		    		}
		    }
		    res.send(status);
		  });
	}
	else {
		res.send(status);
	}
});

userResource.route('check_email', function(req, res, next) {
	status = null;
	params = req.query;
	user.findOne({email: params.email}, function(err, user) {
		if ( !err && (user!= null) ) {
			status = {
					"statusCode": 400,
					"error": "Bad Request",
					"message": "Email address already registerd"
					};
		}
		res.send(status);
	});
	
});

userResource.route('logout', function(req, res, next) {
	status = false;
	params = req.query;
	token = params.token;
	userId = params.userId;
	jwt.verify(token, config.secret, function(err, decoded) {
		if( decoded ) {
			status = { "id": userId };
		}
	});
	res.send(status);
});

userResource.register(app, '/users');

customersSchema = new mongo.Schema({
	name: String,
	title: String,
    logo_id: String,
    company_no:String,
	gst_no: String,
    email: String,
    addresses: Object,
    contact_numbers: Object,
    fax: String,
    website_url: String,
    invoice_language_id: String,
    payment_terms: String,
    tax_id: Boolean,
    type: String,
    is_active: Boolean,
    created_by: ObjectId,
    updated_by: ObjectId,
    deleted_by: ObjectId,
    deleted_on: Date
}, {timestamps: true});

var customers = restful.model('companies', customersSchema);

var customersResource = app.resource = customers.methods(['get', 'post', 'put', 'delete']);

customersResource.register(app, '/customers');

app.listen(8080, function () {
    console.log('HRMS API server listening on port 8080!')
})