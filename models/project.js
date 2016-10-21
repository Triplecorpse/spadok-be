var mongoose = require('mongoose');
var ProjectSchema = new mongoose.Schema({
    name: Object,
    shortDescription: Object,
    longDescription: Object,
    picture: String,
    pictures: Array,
    videoUrl: String,
    videoName: String,
    people: Number,
    money: Number,
    moneyTotal: Number,
    date: Date,
    isPublished: Boolean,
    isCompleted: Boolean,
    isVideoOnMain: Boolean,
    parentProjectId: String,
    ownerId: String
});

module.exports = mongoose.model('Project', ProjectSchema);