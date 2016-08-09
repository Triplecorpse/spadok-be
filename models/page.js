var mongoose = require('mongoose');
var PageSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Page', PageSchema);