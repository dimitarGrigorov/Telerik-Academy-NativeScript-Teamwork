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

function getResult(result) {
    result.forEach(function(item) {
        var data = {
            name: item.name,
            rating: 5,
            comments: 5,
            id: item.id,
            url: item.url
        };
        console.log(JSON.stringify(item));
        cinemaCollection.push(data);
    });
}

exports.navigatedTo = function(args) {
    page = args.object;
    page.bindingContext = pageData;

    pageData.set("isLoading", true);

    var data = el.data('Cinemas');
    var query = new Everlive.Query();
    query.skip(0).take(1);
    data.get(query)
        .then(function(data) {
            pageData.set("isLoading", false);
            getResult(data.result);
            var listView = page.getViewById("cinema-list");
            listView.animate({
                opacity: 1,
                duration: 1000
            });
        }, function(error) {

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

    var cinemaInput = page.getViewById("name");

    emptyCollection();

    if (cinemaInput.text == "") {
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
        cinemaService.getByFilter(cinemaInput.text, function(result) {
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
