var _ = require('lodash');

function getList(result) {
    var collection = [];

    _.each(result, function(item) {
        var averageRating = 0;
        var commentsCount = 0;

        if (item['CinemaRatings'][0] != undefined) {
            averageRating = Math.round(item['CinemaRatings'][0].Average);
        }

        if (item['CinemaComments'][0] != undefined) {
            commentsCount = item['CinemaComments'][0].Count;
        }

        var data = {
            name: item.Name,
            rating: averageRating,
            comments: commentsCount,
            id: item.Id,
            url: item.ImageUrl,
            location: item.Location
        };

        collection.push(data);
    });

    return collection;
}

function validateUrl(url) {
    var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(url);
}

function getKeywords(keywordString) {
    return keywordString.toLowerCase()
        .split(',')
        .map(function (keyword) {
            return keyword.trim();
        })
        .filter(function (keyword) {
            return keyword;
        });
}

exports.getList = getList;
exports.validateUrl = validateUrl;
exports.getKeywords = getKeywords;