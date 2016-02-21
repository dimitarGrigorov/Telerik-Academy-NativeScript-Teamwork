var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var ImageModule = require("ui/image");
var gestures = require("ui/gestures");
var Observable = require('data/observable').Observable;
var cinemaService = require("../../../shared/services/cinema-service");
var utils = require("../../../shared/utils");
var Toast = require("nativescript-toast");
var appSettings = require("application-settings");

var page;

// Cinema Data

var showCinemaFilter = appSettings.getBoolean("showCinemaFilter", false);
var cinemaCollection = [];
var pageData = new Observable();
pageData.set("cinemaList", cinemaCollection);
pageData.set("showCinemaFilter", showCinemaFilter);

// Pagination

var pageNumber = 0;
var pageSize = 5;
var totalItems = 0;

// Filter

var sortByRating = true;
var sortByComments = true;

function loadList() {
    pageData.set("isLoading", true);

    var offset = pageNumber * pageSize;
    var limit = pageSize;

    var name = page.getViewById("name").text;

    cinemaService
        .getCinemaList({ offset: offset, limit: limit, keyword: name })
        .then(function(response) {
            totalItems = response.count;

            cinemaCollection = utils.getList(response.result);

            pageData.set("cinemaList", cinemaCollection);
            pageData.set("isLoading", false);

            var listView = page.getViewById("cinema-list");
            listView.animate({
                opacity: 1,
                duration: 1000
            });
        }, function(error) {
            console.log(JSON.stringify(error))
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

    loadList();
};

// Cinema

exports.viewDetails = function(args) {
    var cinema = cinemaCollection[args.index];

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
    loadList();
};

exports.hideCinemaFilter = function(args) {
    var direction = args.direction;

    switch (direction) {
        case 4:
        case 1:
        case 2:
            pageData.set("showCinemaFilter", false);
            appSettings.setBoolean("showCinemaFilter", false);

            Toast.makeText("Hint: Double tap on the search icon to show the cinema filter!", "long").show();
            break;
    }
}

exports.showCinemaFilter = function(args) {
    pageData.set("showCinemaFilter", true);
    appSettings.setBoolean("showCinemaFilter", true);

    Toast.makeText("Hint: Swipe on the cinema filter to hide it!!", "long").show();
}

// Pagination

exports.previousPage = function() {
    if (pageNumber == 0) {
        return;
    }

    pageNumber--;

    loadList();
}

exports.nextPage = function() {
    if ((pageNumber + 1) * pageSize >= totalItems) {
        return;
    }

    pageNumber++;

    loadList();
}
