var mongoose = require('mongoose');
var ProjectSchema   = new mongoose.Schema({
    name: String,
    shortDescription: String,
    description: String,
    picture: String,
    people: Number,
    money: Number,
    date: Date,
    isPublished: Boolean,
    isCompleted: Boolean,
    child: String,
    extension: String
});

module.exports = mongoose.model('Project', ProjectSchema);