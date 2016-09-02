var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    rusName: String,
    engName: String,
    name: String,
    email: String,
    password: String,
    picture: String,
    rusPosition: String,
    engPosition: String,
    date: Date,
    canHandleProjects: Boolean,
    canHandleUsers: Boolean,
    isInTeam: Boolean
});

module.exports = mongoose.model('User', UserSchema);