var mongoose = require('mongoose');
var PartnerSchema = new mongoose.Schema({
    name: String,
    picture: String,
    achievements: Array,
    isPublished: Boolean
});

module.exports = mongoose.model('Partner', PartnerSchema);