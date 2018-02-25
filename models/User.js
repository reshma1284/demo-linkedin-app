var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    jobTitle: {
      type: String,
      required: true
    }
});

module.exports = mongoose.model('User',UserSchema);

//modelname, schema name and collection name is automatially taken
