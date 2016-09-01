var mongoose = require('mongoose');
var PageSchema = new mongoose.Schema({
    email: String,
    engAddress: String,
    engArea: String,
    engAuthor: String,
    engCitation: String,
    engCity: String,
    engCommunity: String,
    engHead: String,
    engMission: String,
    engPostalCode: String,
    engRegion: String,
    engStats: String,
    engTeam: String,
    phone: Number,
    rusAddress: String,
    rusArea: String,
    rusAuthor: String,
    rusCitation: String,
    rusCity: String,
    rusCommunity: String,
    rusHead: String,
    rusMission: String,
    rusPostalcode: String,
    rusRegion: String,
    rusStats: String,
    rusTeam: String,
    type: String
});

module.exports = mongoose.model('Page', PageSchema);