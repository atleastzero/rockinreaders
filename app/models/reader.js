var mongoose = require('mongoose');

var readerSchema = mongoose.Schema({
    siteUser : mongoose.ObjectId,
    firstName : String,
    lastName : String,
    age : Number,
    readingLevel : Number
});

module.exports = mongoose.model('Reader', readerSchema);