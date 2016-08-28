var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    rusName: String,
    engName: String,
    email: String,
    password: String,
    date: Date,
    extension: String,
    canHandleProjects: Boolean,
    canHandleUsers: Boolean,
    isInTeam: Boolean
});

module.exports = mongoose.model('User', UserSchema);