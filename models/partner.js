var mongoose = require('mongoose');
var PartnerSchema = new mongoose.Schema({
    name: String,
    gLogo: String,
    cLogo: String,
    site: String,
    description: String,
    projectsHelped: Number,
    isPublished: Boolean
});

module.exports = mongoose.model('Partner', PartnerSchema);