const mongoose = require('mongoose');


const crawlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    data: {
        type: String,

    },
    ip: {
        type: String,

    },
    route: {
        type: String,

    }

}, {
    timestamps: true
});



const Crawl = mongoose.model('crawldata', crawlSchema);


module.exports = {
    Crawl
}