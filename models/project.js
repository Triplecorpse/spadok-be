var mongoose = require('mongoose');
var ProjectSchema   = new mongoose.Schema({
    name: String,
    description: String,
    picture: String,
    people: Number,
    money: Number,
    date: Date,
    isPublished: Boolean,
    isCompleted: Boolean,
    extension: String
});

module.exports = mongoose.model('Project', ProjectSchema);