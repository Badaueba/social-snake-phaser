var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
    facebook : {
        id : String,
        token : String,
        email : String,
        name : String,
        displayName : String
    },
});

module.exports = mongoose.model('User', userSchema);
