/*
 * API MICROSERVICE, GET DATA FROM DB
 */
"use strict";

var mongoose = require("mongoose");
//mongoose.createConnection(process.env.MONGOLAB_URI || "mongodb://localhost:27017/paths");
mongoose.createConnection("mongodb://localhost:27017/paths");
// Schema
var Poll = require("../models/Poll");
var data = [{
            label     : "Manchester United",
            highlight : "#ea4876",
            color     : "#d67c48",
            value     : 5
          },
          {
            label     : "Arsenal",
            highlight : "#f2ab96",
            color     : "#9fa1f9",
            value     : 10
          },
          {
            label     : "Liverpool",
            highlight : "#fcc7d9",
            color     : "#e5c995",
            value     : 2
          },
          {
            label     : "Manchester City",
            highlight : "#ff3d23",
            color     : "#f2d9a7",
            value     : 1
          }
        ];

exports.getAll = (req, res) => {
  Poll.find({}, (err, docs) => {
    if(err) throw err;
    if(docs === null || docs.length === 0)
      res.end(JSON.stringify(data));
    else if(docs.length > 0){
        console.log("Returning data from database...");
        res.end(JSON.stringify(docs));
    }
  });
};



exports.getRecent = (req, res) => {
    if(req.session.passport.user === undefined)
      res.send(JSON.stringify(data));
    // Returns most recent poll created by logged in user
    Poll.find({"polls.poll.username": req.session.passport.user}).sort("-polls.poll.created").exec(function(err, docs){
        if(err) throw err;
        if(docs === undefined || docs === null || docs.length === 0)
            res.end(JSON.stringify(data));
        else if(docs.length > 0){
            console.log("Returning data from database...");
            res.end(JSON.stringify(docs[0].polls.poll));
        }
        res.end();
    });
};

/*
 * RETURNS RANDOM RECORD
 */

exports.randomChart = (req, res) => {
    Poll.count().exec(function(err, count){
        if(err) throw err;
        var random = Math.floor(Math.random() * count);
        
        Poll.findOne().skip(random).exec(function (err, result) {
          if(err) throw err;
          if(result === null)
            res.end(JSON.stringify(data));
          else
            res.end(JSON.stringify(result.polls.poll));
        });
    });
};