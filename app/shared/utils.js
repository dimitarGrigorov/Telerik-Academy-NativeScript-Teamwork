var _ = require('lodash');

function sortById(items) {
    var collection = {};

    _.each(items, function(item) {
        if (!collection[item.Id]) {
            collection[item.Id] = [];
        }

        collection[item.Id].push(item);
    });

    return collection;
}

function getList(result) {
    var collection = [];

    _.each(result, function(item) {
        var averageRating = 0;
        var commentsCount = 0;

        if (item["CinemaRatings"][0] != undefined) {
            averageRating = Math.round(item["CinemaRatings"][0].Sum / item["CinemaRatings"][0].Count, 2);
        }

        if (item["CinemaComments"][0] != undefined) {
            commentsCount = item["CinemaComments"][0].Count;
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

exports.sortById = sortById;
exports.getList = getList;
