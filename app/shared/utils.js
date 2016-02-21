var _ = require('lodash');

function getList(result) {
    var collection = [];

    _.each(result, function(item) {
        var averageRating = 0;
        var commentsCount = 0;

        console.log(JSON.stringify(item));

        if (item["CinemaRatings"][0] != undefined) {
            averageRating = Math.round(item["CinemaRatings"][0].Average);
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

exports.getList = getList;
