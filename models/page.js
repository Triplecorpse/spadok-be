var mongoose = require('mongoose');
var PageSchema = new mongoose.Schema({
    email: String,
    fb: String,
    vk: String,
    instagram: String,
    phone: String,
    address: Object,
    area: Object,
    author: Object,
    citation: Object,
    city: Object,
    community: Object,
    head: Object,
    mission: Object,
    postalcode: Object,
    region: Object,
    stats: Object,
    team: Object,
    type: String,
    videoID: String,
    currencyRate: Number
});

module.exports = mongoose.model('Page', PageSchema);