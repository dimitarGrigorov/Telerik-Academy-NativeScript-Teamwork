var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var ImageModule = require("ui/image");
var view = require("ui/core/view");
var gestures = require("ui/gestures");
var Observable = require('data/observable').Observable;
var CinemaViewModel = require("../../../shared/view-models/cinema-view-model");
var cinema = new CinemaViewModel();

var cinemaCollection = [];

exports.navigatedTo = function(args) {
    page = args.object;
    page.addCssFile("views/cinema/list/list.css");

    cinemaCollection = cinema.getAll();

    var pageData = new Observable();
    pageData.set("cinemaList", cinemaCollection);

    page.bindingContext = pageData;
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
    //frameModule.topmost().navigate(navigationEntry);
};
