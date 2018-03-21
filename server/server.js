
/* --------------------- Set up --------------------- starts */

var env = process.env.NODE_ENV || 'development'; /* Get current environment */
var config = require('./config/dbConfig')[env]; /* Get config based on environment */

var express = require('express'),
	bodyParser = require('body-parser'), /* pull information from HTML POST */
	methodOverride = require('method-override'), /* simulate DELETE and PUT (express4) */
	morgan = require('morgan'), /* log requests to the console */
	mongo = require("mongoose"), /* mongoose for mongodb */
	port = process.env.PORT || 8080; /* setting up port */

var app = express(); /* create our app w/ express */

/* --------------------- Set up --------------------- ends */

/* --------------------- Configuration --------------------- starts */

var db = mongo.connect("mongodb://" + config.database.host + ":" + config.database.port + "/" + config.database.db, function (err, response) {
    if (err) { console.log(err); }
    else { console.log('Connected to ' + db, ' + ', response); }
});

app.use(morgan('dev')); /* log every request to the console */
app.use(bodyParser.urlencoded({'extended':'true'})); /* parse application/x-www-form-urlencoded */
app.use(bodyParser.json()); /* parse application/json */
app.use(bodyParser.json({type:'application/vnd.api+json'})); /* parse application/vnd.api+json as json */
app.use(methodOverride());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    /* intercepts OPTIONS method */
    if ('OPTIONS' === req.method) {
      /* respond with 200 */
      res.send(200);
    }
    else {
      /* move on */
      next();
    }
});

app.disable('etag'); /* For removing cached ajax calls */

/* --------------------- Configuration --------------------- ends */

require('./models/user')(app); /* including user model with app */

require('./models/customer')(app); /* including customer model with app */

/* listen (start app with node server.js) */

app.listen(port, function () {
    console.log('HRMS API server listening on port ' + port + '!');
});