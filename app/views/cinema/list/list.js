var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var ImageModule = require("ui/image");
var view = require("ui/core/view");
var gestures = require("ui/gestures");
var Observable = require('data/observable').Observable;
var CinemaViewModel = require("../../../shared/view-models/cinema-view-model");
var cinema = new CinemaViewModel();
var cinemaService = require("../../../shared/services/cinema-service");
var ObservableArray = require("data/observable-array").ObservableArray;

var cinemaCollection = new ObservableArray([]);
var pageData = new Observable();
pageData.set("cinemaList", cinemaCollection);

exports.navigatedTo = function(args) {
    page = args.object;
    page.addCssFile("views/cinema/list/list.css");
    page.bindingContext = pageData;

    cinemaService.getAll(0, 2, function(result) {
        console.log(JSON.stringify(result));
        cinemaCollection.push(result.value);
    });
};

exports.viewDetails = function(args) {
    // TODO: check if cinemaCollection has selected index
    var cinemaId = cinemaCollection[args.index].id;

    console.log(cinemaId);

    var navigationEntry = {
        moduleName: "views/cinema/details/details",
        context: {
            cinemaId: cinemaId,
        },
        animated: true
    };
    frameModule.topmost().navigate(navigationEntry);
};
