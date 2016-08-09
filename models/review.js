var mongoose = require('mongoose');
var ReviewSchema   = new mongoose.Schema({
    name: String,
    occupation: String,
    review: String,
    related: String,
    isPublished: Boolean

});

module.exports = mongoose.model('Review', ReviewSchema);