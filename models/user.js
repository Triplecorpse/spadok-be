var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    name: Object,
    login: String,
    email: String,
    password: String,
    picture: String,
    position: Object,
    date: Date,
    canHandleProjects: Boolean,
    canHandleReviews: Boolean,
    canHandlePartners: Boolean,
    canHandlePageData: Boolean,
    canHandleUsers: Boolean,
    isInTeam: Boolean,
    contacts: Object
});

module.exports = mongoose.model('User', UserSchema);