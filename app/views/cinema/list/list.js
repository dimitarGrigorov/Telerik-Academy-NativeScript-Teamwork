var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var ImageModule = require("ui/image");
var view = require("ui/core/view");
var gestures = require("ui/gestures");
var Observable = require('data/observable').Observable;
var cinemaService = require("../../../shared/services/cinema-service");
var ObservableArray = require("data/observable-array").ObservableArray;
var loadash = require("lodash");
var config = require("../../../shared/config");

var page;

var cinemaCollection = new ObservableArray([]);

var pageData = new Observable();
pageData.set("cinemaList", cinemaCollection);

var currentPage = 0;

exports.navigatedTo = function(args) {
    page = args.object;
    page.bindingContext = pageData;

    pageData.set("isLoading", true);

    var listView = page.getViewById("cinema-list");

    while (cinemaCollection.length) {
        cinemaCollection.pop();
    }

    cinemaService.getAll(currentPage * config.cinemaListSize + 1, config.cinemaListSize, function(result) {
        var totalRating = loadash.reduce(result.value.rating, function(sum, n) {
            return sum + n;
        }, 0);
        var averageRating = totalRating / result.value.rating.length;
        var data = {
            name: result.value.name,
            rating: averageRating,
            comments: result.value.comments,
            id: result.value.id,
            url: result.value.url
        }
        cinemaCollection.push(data);

        pageData.set("isLoading", false);

        listView.animate({
            opacity: 1,
            duration: 1000
        });
    });
};

exports.prev = function() {
    if (currentPage > 0) {
        currentPage--;
    } else {
        return;
    }

    pageData.set("isLoading", true);

    var offset = currentPage * config.cinemaListSize + 1;
    var limit = config.cinemaListSize;

    while (cinemaCollection.length) {
        cinemaCollection.pop();
    }

    var listView = page.getViewById("cinema-list");

    cinemaService.getAll(offset, limit, function(result) {
        var totalRating = loadash.reduce(result.value.rating, function(sum, n) {
            return sum + n;
        }, 0);
        var averageRating = totalRating / result.value.rating.length;
        var data = {
            name: result.value.name,
            rating: averageRating,
            comments: result.value.comments,
            id: result.value.id,
            url: result.value.url
        }
        cinemaCollection.push(data);

        pageData.set("isLoading", false);

        listView.animate({
            opacity: 1,
            duration: 1000
        });
    });
}

exports.next = function() {
    currentPage++;

    pageData.set("isLoading", true);

    var offset = currentPage * config.cinemaListSize + 1;
    var limit = config.cinemaListSize;

    var listView = page.getViewById("cinema-list");

    while (cinemaCollection.length) {
        cinemaCollection.pop();
    }

    cinemaService.getAll(offset, limit, function(result) {
        var totalRating = loadash.reduce(result.value.rating, function(sum, n) {
            return sum + n;
        }, 0);
        var averageRating = totalRating / result.value.rating.length;
        var data = {
            name: result.value.name,
            rating: averageRating,
            comments: result.value.comments,
            id: result.value.id,
            url: result.value.url
        }
        cinemaCollection.push(data);

        pageData.set("isLoading", false);

        listView.animate({
            opacity: 1,
            duration: 1000
        });
    });
}

exports.viewDetails = function(args) {
    var cinemaId = cinemaCollection.getItem(args.index).id;

    var navigationEntry = {
        moduleName: "views/cinema/details/details",
        context: {
            cinemaId: cinemaId,
        },
        animated: true
    };

    frameModule.topmost().navigate(navigationEntry);
};
