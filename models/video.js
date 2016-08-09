var mongoose = require('mongoose');
var VideoSchema   = new mongoose.Schema({
    name: String,
    url: String,
    related: String,
    isPublished: Boolean
});

module.exports = mongoose.model('Video', VideoSchema);