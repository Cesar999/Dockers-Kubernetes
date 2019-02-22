"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
//npm install @types/node
var url_mongo = "mongodb://database"; //Docker Compose
//const url_mongo = "mongodb://localhost"; //Localhost
var connectWithRetry = function () {
    return mongoose.connect(url_mongo + '/docker-db-ex2', { useNewUrlParser: true }, function (err) {
        if (err) {
            console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
            setTimeout(connectWithRetry, 5000);
        }
    });
};
connectWithRetry();
var Schema = mongoose.Schema;
var pokSchema = new Schema({
    name: { type: String },
    type: { type: String },
    level: { type: Number }
});
var Pok = mongoose.model('Pok', pokSchema, 'Pok');
//-------------------------------------
var app = express();
var port = 3001;
app.use(bodyParser.json());
var server = app.listen(port, function () {
    console.log("Notification Service port 3001");
});
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.post('/get-pok', function (req, res) {
    Pok.findOne(__assign({}, req.body))
        .then(function (u) {
        res.send(u);
    })
        .catch(function (e) {
    });
});
app.post('/save-pok', function (req, res) {
    var pok1 = new Pok(__assign({}, req.body));
    Pok.findOne({ name: pok1.name })
        .then(function (u) {
        if (u) {
            return Promise.resolve(null);
        }
        else {
            return pok1.save();
        }
    })
        .then(function (flag) {
        if (flag) {
            res.send({ msg: 'Saved' });
        }
        else {
            res.send({ msg: 'Repeated' });
        }
    })
        .catch(function (e) {
    });
});
