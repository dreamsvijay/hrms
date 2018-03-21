var env = process.env.NODE_ENV || 'development'; /* Get current environment */
var config = require('../config/dbConfig')[env]; /* Get config based on environment */

var mongo = require("mongoose"), /* mongoose for mongodb */
	restful = require('node-restful');

/* For JWT token generation and password hashing */
var bcrypt = require('bcrypt'),
	jwt = require('jsonwebtoken');

const Schema = mongo.Schema; /* Assign schema object to private variable */
const ObjectId = Schema.Types.ObjectId; /* Assign ObjectId object to private variable */

module.exports = function(app) {

	/* --------------------- User Model --------------------- starts */
	
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
	
	/* Hashing a password before saving it to the database */
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
	
	/* Creating restful model for customer with respective schema */
	var user = restful.model('users', usersSchema);
	
	/* Defining methods for the model */
	var userResource = app.resource = user.methods(['get', 'post', 'put', 'delete']);
	
	/* ------------------------ UserResource customized routes ------------------------ starts */
	
	/*
	 * Service to signup user
	 */
	userResource.route('signup', function(req, res, next){
		status = false; /* Setting the signup status flag */
		params = req.body; /* Get post params */
		
		/* 
		 * Checking email and password for normal signup &
		 * Checking email and profile_type( Facebook|Google ) for social signup 
		 * */
		if ( params.email && ( params.password || params.profile_type ) ) {
	
			  /* Hold user information */
			  var userData = {
			    first_name: params.name,
			    email: params.email
			  }
		      
			  /* Setting user name */
			  if ( params.name ) {
				  userData.first_name = params.name;
			  }
			  
			  /* Setting user first name */
			  if ( params.first_name ) {
				  userData.first_name = params.first_name;
			  }
			  
			  /* Setting user last name */
			  if ( params.last_name ) {
				  userData.last_name = params.last_name;
			  }
			  
			  /* Setting user password & profile type */
			  if( params.profile_type )  {
				userData.profile_type = params.profile_type;
				userData.password = ""; /* Setting empty password for social signup */
			  }
			  else {
				  /* Setting password for normal signup */
				  userData.password = params.password;
			  }
			  
			  /* Creating user */
			  status = user.create(userData, function(err, users) {
			    if (!err) {
			    	status = { "id": users._id }; /* Setting user ID as success response */
			    }
			    res.send(status); /* Sending the status */
			  });
		}
		else {
			res.send(status); /* Sending the status if it fails */
		}
	});
	
	/*
	 * Service to login user
	 */
	userResource.route('login', function(req, res, next){
		status = false; /* Setting the login status flag */
		params = req.body; /* Get post params */
		
		/* TODO PASSWORD */ 
		if ( params.email ) {
			/* Finding user document with respective emailId */
			  user.findOne({email: params.email}, function(err, users) {
				/* Valid user response */
			    if ( !err && (users!= null) ) {
			    		/* Checking password */
			    		if( bcrypt.compareSync(params.password, users.password) ) {
			    		    /* Creating a token after login success */
			    		    var token = jwt.sign({ id: users._id }, config.secret, {
			    		      expiresIn: 3600  /* Expires in 1 hour */
			    		    });
			    		    status = { "token": token, "id": users._id }; /* Setting user token and user id as status */
			    		}
			    }
			    res.send(status); /* Sending the status */
			  });
		}
		else {
			res.send(status); /* Sending the status if empty emailId passed */
		}
	});
	
	/*
	 * Service to check email-id is already registered or not
	 */
	userResource.route('check_email', function(req, res, next) {
		status = null; /* Setting the already registered status flag */
		params = req.query; /* Get url params */
		
		/* Finding user document with respective emailId */
		user.findOne({email: params.email}, function(err, user) {
			/* Valid user response */
			if ( !err && (user!= null) ) {
				status = {
						"statusCode": 400,
						"error": "Bad Request",
						"message": "Email address already registerd"
						};
			}
			res.send(status); /* Sending the status */
		});
		
	});
	
	/* ------------------------ UserResource customized routes ------------------------ starts */
	
	/* Registering the user restful model */
	userResource.register(app, '/users');
	
	/* --------------------- User Model --------------------- ends */
}