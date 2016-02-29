var mongoose = require('mongoose');

// define the schema for our user model
var pollSchema = mongoose.Schema({

  polls		: {
      poll: {
          username	: String,
          created   : Date,
          url       : String,
          title     : String,
          labels    : Array,
          dataset   : Array
      }
  }

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Poll', pollSchema);