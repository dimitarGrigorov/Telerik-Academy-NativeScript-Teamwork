var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var ImageModule = require("ui/image");
var gestures = require("ui/gestures");
var Observable = require('data/observable').Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var loadash = require("lodash");
var config = require("../../../shared/config");
//var cinemaService = require("../../../shared/services/cinema-service");
var Everlive = require('../../../libs/everlive.all.min');
var el = new Everlive('gb85as3hebz4amck');

var page;

var cinemaCollection = [];
var pageData = new Observable();
pageData.set("cinemaList", cinemaCollection);
pageData.set("showCinemaFilter", true);

var pageNumber = 0;
var pageSize = 5;

function getCinemaAverageRating(cinemaRatings) {
    var sum = loadash.reduce(cinemaRatings, function(sum, n) {
        return sum + n;
    }, 0);

    var averageRating = Math.round(sum / cinemaRatings.length, 1);

    return averageRating;
}

function getList(result) {
    var collection = [];

    for (var i = 0; i < result.length; i++) {
        var averageRating = getCinemaAverageRating(result[i].rating);

        var data = {
            name: result[i].name,
            rating: averageRating,
            comments: 5,
            id: result[i].id,
            url: result[i].url
        };

        collection.push(data);
    }

    return collection;
}

function getQuery(offset, limit, name) {
    var name = name || null;

    var data = el.data('Cinemas');

    var query = new Everlive.Query();

    if (name == null || name.length == 0) {
        query
            .skip(offset)
            .take(limit);
    } else {
        query
            .where()
            .or()
            .startsWith('name', name)
            .endsWith('name', name);
    }

    return data.get(query);
}

function load() {
    pageData.set("isLoading", true);

    var offset = pageNumber * pageSize;
    var limit = pageSize;

    var name = page.getViewById("name").text;

    getQuery(offset, limit, name)
        .then(function(response) {
            pageData.set("isLoading", false);

            if (true) {
                var list = getList(response.result);

                cinemaCollection = list;

                pageData.set("cinemaList", cinemaCollection);

                var listView = page.getViewById("cinema-list");
                listView.animate({
                    opacity: 1,
                    duration: 1000
                });
            } else {
                pageNumber--;

                dialogsModule.alert({
                    message: "No more results to show!",
                    okButtonText: "OK"
                });
            }
        }, function(error) {
            pageData.set("isLoading", false);
            
            dialogsModule.alert({
                message: "An error occured while trying to get the cinema list!",
                okButtonText: "OK"
            });
        });
}

exports.navigatedTo = function(args) {
    page = args.object;
    page.bindingContext = pageData;

    load();
};

// Cinema

exports.viewDetails = function(args) {
    var cinema = cinemaCollection.indexOf(args.index);

    var id = cinema.id;

    var navigationEntry = {
        moduleName: "views/cinema/details/details",
        context: {
            cinemaId: id
        },
        animated: true
    };

    frameModule.topmost().navigate(navigationEntry);
};

exports.addCinema = function(args) {
    frameModule.topmost().navigate("views/cinema/add-item/add-item");
};

// Filter

exports.filter = function(args) {
    load();
};

exports.hideCinemaFilter = function(args) {
    var direction = args.direction;

    switch (direction) {
        case 4:
        case 1:
        case 2:
            pageData.set("showCinemaFilter", false);
            break;
    }
}

exports.showCinemaFilter = function(args) {
    pageData.set("showCinemaFilter", true);
}

// Pagination

exports.previousPage = function() {
    if (pageNumber == 0) {
        return;
    }

    pageNumber--;

    load();
}

exports.nextPage = function() {
    pageNumber++;

    load();
}
