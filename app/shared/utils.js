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
        var data = {
            name: item.Name,
            rating: item.AverageRating,
            comments: item.CommentsCount,
            id: item.Id,
            url: item.ImageUrl,
            location: item.Location
        };

        collection.push(data);
    });

    return collection;
}

function getAverage(arr) {
    if (arr.length == undefined || arr.length == 0) {
        return 0;
    }

    var sum = _.reduce(arr, function(sum, n) {
        return sum + n;
    }, 0);

    var average = Math.round(sum / arr.length, 2);

    return average;
}

exports.sortById = sortById;
exports.getAverage = getAverage;
exports.getList = getList;
