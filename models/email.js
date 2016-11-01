var mongoose = require('mongoose');
var EmailSchema = new mongoose.Schema({
    email: String,
    preferredLanguage: String
});

module.exports = mongoose.model('Email', EmailSchema);