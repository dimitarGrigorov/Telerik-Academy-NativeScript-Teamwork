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

function getCinemaAverageRating(cinemaRatings) {
    var sum = loadash.reduce(cinemaRatings, function(sum, n) {
        return sum + n;
    }, 0);

    var averageRating = sum / cinemaRatings.length;

    return averageRating;
}

exports.navigatedTo = function(args) {
    page = args.object;
    page.bindingContext = pageData;

    pageData.set("isLoading", true);

    while (cinemaCollection.length) {
        cinemaCollection.pop();
    }

    cinemaService.getAll(function(result) {
        var data = {
            name: result.value.name,
            rating: getCinemaAverageRating(result.value.rating),
            comments: result.value.comments,
            id: result.value.id,
            url: result.value.url,
            key: result.key
        }

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

    while (cinemaCollection.length) {
        cinemaCollection.pop();
    }

    if (filter.text == "") {
        cinemaService.getAll(function(result) {
            var data = {
                name: result.value.name,
                rating: getCinemaAverageRating(result.value.rating),
                comments: result.value.comments,
                id: result.value.id,
                url: result.value.url,
                key: result.key
            }

            cinemaCollection.push(data);

            pageData.set("isLoading", false);
        });
    } else {
        cinemaService.getByFilter(filter.text, function(result) {
            var data = {
                name: result.value.name,
                rating: getCinemaAverageRating(result.value.rating),
                comments: result.value.comments,
                id: result.value.id,
                url: result.value.url,
                key: result.key
            }

            cinemaCollection.push(data);

            pageData.set("isLoading", false);
        }).then(function(success) {
            pageData.set("isLoading", false);

            if (cinemaCollection.length == 0) {
                dialogsModule.alert({
                    message: "Nothing found!",
                    okButtonText: "OK"
                });
            }
        }).catch(function(error) {
            console.log("error");
        });
    }
};
