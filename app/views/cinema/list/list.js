var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var ImageModule = require("ui/image");
var gestures = require("ui/gestures");
var Observable = require('data/observable').Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var loadash = require("lodash");
var config = require("../../../shared/config");
var cinemaService = require("../../../shared/services/cinema-service");

var page;

var cinemaCollection = new ObservableArray([]);
var pageData = new Observable();
pageData.set("cinemaList", cinemaCollection);
pageData.set("showCinemaFilter", true);


function emptyCollection() {
    while (cinemaCollection.length) {
        cinemaCollection.pop();
    }
}

function getCinemaAverageRating(cinemaRatings) {
    var sum = loadash.reduce(cinemaRatings, function(sum, n) {
        return sum + n;
    }, 0);

    var averageRating = sum / cinemaRatings.length;

    return averageRating;
}

function parseCinemaResult(result) {
    var data = {
        name: result.value.name,
        rating: getCinemaAverageRating(result.value.rating),
        comments: Object.keys(result.value.comments).length,
        id: result.value.id,
        url: result.value.url,
        key: result.key
    }

    return data;
}

exports.navigatedTo = function(args) {
    page = args.object;
    page.bindingContext = pageData;

    pageData.set("isLoading", true);

    emptyCollection();

    cinemaService.getAll(function(result) {
        var data = parseCinemaResult(result);

        cinemaCollection.push(data);

        pageData.set("isLoading", false);

        var listView = page.getViewById("cinema-list");
        listView.animate({
            opacity: 1,
            duration: 1000
        });
    });
};

exports.viewDetails = function(args) {
    var cinema = cinemaCollection.getItem(args.index);

    var id = cinema.id;
    var key = cinema.key;

    var navigationEntry = {
        moduleName: "views/cinema/details/details",
        context: {
            cinemaId: id,
            key: key
        },
        animated: true
    };

    frameModule.topmost().navigate(navigationEntry);
};

exports.addCinema = function(args) {
    frameModule.topmost().navigate("views/cinema/add-item/add-item");
};

exports.filter = function(args) {
    pageData.set("isLoading", true);

    var filter = page.getViewById("name");

    emptyCollection();

    if (filter.text == "") {
        cinemaService.getAll(function(result) {
            var data = parseCinemaResult(result);

            cinemaCollection.push(data);
        }).then(function(success) {
            pageData.set("isLoading", false);
        }).catch(function(error) {
            pageData.set("isLoading", false);

            dialogsModule.alert({
                message: "Nothing found!",
                okButtonText: "OK"
            });
        });
    } else {
        cinemaService.getByFilter(filter.text, function(result) {
            var data = parseCinemaResult(result);

            cinemaCollection.push(data);
        }).then(function(success) {
            pageData.set("isLoading", false);
        }).catch(function(error) {
            pageData.set("isLoading", false);

            dialogsModule.alert({
                message: "Nothing found!",
                okButtonText: "OK"
            });
        });
    }
};

exports.toggleCinemaFilterVisibility = function(args) {
    var direction = args.direction;

    switch (direction) {
        case 4:
            pageData.set("showCinemaFilter", false);
            break;
        case 8:
            pageData.set("showCinemaFilter", true);
            break;
    }
}

exports.showCinemaFilter = function(args) {
    pageData.set("showCinemaFilter", true);
}
