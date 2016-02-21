var Everlive = require("../../libs/everlive.all.min");
var everlive = require("../../shared/everlive");
var endpoint = 'Cinemas';

function getById(id) {
    return everlive.data(endpoint).getById(id);
}

function getCinemaList(filter) {
    var expandExp = {
        "Ratings.CinemaId": true,
        "Comments.CinemaId": true
    };

    filter = filter || {};

    var offset = filter.offset || 0;
    var limit = filter.limit || 5;

    var data = everlive.data("Cinemas");
    var query = new Everlive.Query();
    query.expand(expandExp);

    query.skip(offset).take(limit);


    return data.get(query);
}

exports.getById = getById;
exports.getCinemaList = getCinemaList;
