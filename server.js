var env = process.env.NODE_ENV || 'development';
var config = require('./dbConfig')[env];

var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var mongo = require("mongoose");
var app = express();

var db = mongo.connect("mongodb://" + config.database.host + ":" + config.database.port + "/" + config.database.db, function (err, response) {
    if (err) { console.log(err); }
    else { console.log('Connected to ' + db, ' + ', response); }
});

app.use(bodyParser());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', config.url);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var model = mongo.model('users');

app.post("/api/SaveUser", function (req, res) {
    var mod = new model(req.body);
    if (req.body.mode == "Save") {
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                res.send({ data: "Record has been Inserted..!!" });
            }
        });
    }
    else {
        model.findByIdAndUpdate(req.body.id, { first_name: req.body.first_name, last_name: req.body.last_name },
            function (err, data) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send({ data: "Record has been Updated..!!" });
                }
            });


    }
})

app.post("/api/deleteUser", function (req, res) {
    model.remove({ _id: req.body.id }, function (err) {
        if (err) {
            res.send(err);
        }
        else {
            res.send({ data: "Record has been Deleted..!!" });
        }
    });
})



app.get("/api/getUser", function (req, res) {
    model.find({}, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    });
})


app.listen(8080, function () {
    console.log('HRMS API server listening on port 8080!')
})