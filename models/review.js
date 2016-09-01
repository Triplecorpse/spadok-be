var mongoose = require('mongoose');
var ReviewSchema   = new mongoose.Schema({
    name: String,
    occupation: String,
    email: String,
    review: String,
    isPublished: Boolean
});

module.exports = mongoose.model('Review', ReviewSchema);