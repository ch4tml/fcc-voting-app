/*
 * GET create page.
 */
 
var Poll = require("../models/Poll.js");
var poll = new Poll();
var randomColour = require("randomcolor");
var randomString = require("randomstring");

exports.getCharts = (req, res) => {
    res.render("allCharts", {
        title: "All Polls"
    });
};


exports.create = (req, res) => {
    res.render("create", {
        title: "Poll & Votes"
    });
};

/*
 * AUTHENTICATED USER ACTIONS
 */
 
/* // CREATE NEW POLL
 * 1) Instantiate new Poll
 * 2) Create new dataset
 * 
 */

exports.submit = (req, res) => {
    // Filters body options - if a user adds an input and doesn't use it, this is filtered
    var labels = req.body.option.filter(item => item.length > 0);
    var data = [];
    // For each non-empty option the value is set at 0
    labels.forEach(item => data.push(0));
    
    poll.polls.poll = {
        username        : req.session.passport.user,
        created         : Date.now(),
        title           : req.body.title,
        url             : randomString.generate(8),
        labels          : labels,
        dataset         : [{
            fillColor   : randomColour(),
            strokeColor : "rgba(220,220,220,0.8)",
            data        : data
        }]
    };
    
    poll.save((err) => {
        if (err) throw err;
        console.log("Successfully stored in the database");
    });
 
    res.redirect("/create");
};

/* // UPDATE EXISTING POLL
 * 1) Authenticate user - only logged in user can delete poll //  must be there their own poll
 * 2) If no authenticated, redirect to home/signup/login
 *
 * 1) FindOne Poll by ID
 * 2) Update new dataset/ push new data label to dataset
 * 
 */
 
 exports.vote = (req, res) => {
    res.render("vote", {
       title: "Poll & Votes" 
    });
 };
 
 exports.postVote = (req, res) =>{
     
 };
 
 /* // DELETE EXISTING POLL
 * 1) Authenticate user - only logged in user can delete poll //  must be there their own poll
 * 2) If no authenticated, redirect to home/signup/login
 *
 * 1) FindOne Poll by ID
 * 2) Update new dataset/ push new data label to dataset
 * 
 */
 
 /*
    poll.remove({_id: id}(err) => {
        if (err) throw err;
        console.log("Successfully removed poll from data");
    });
 */
 
 /*
 * UNAUTHENTICATED USER ACTIONS
 */
 
/* // VOTE ON EXISTING POLL
 * 1) FindOne Poll by ID and label
 * 2) Update dataset on database
 * 3) 
 */
 
 exports.addVote = (req, res) => {
    /*poll.update((err) => {
        if (err) throw err;
        console.log("Successfully updated the document in the database");
    });*/
 };
 
 /* 
  * REDIRECT TO EXISTING POLL
  */
  
 exports.redirect = (req, res) => {
    res.render("vote");
 };