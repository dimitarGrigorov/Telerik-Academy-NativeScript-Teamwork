var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var ImageModule = require("ui/image");
var Observable = require('data/observable').Observable;
var CinemaViewModel = require("../../../shared/view-models/cinema-view-model");
var cinema = new CinemaViewModel();

exports.navigatedTo = function(args) {
    page = args.object;
    page.addCssFile("views/cinema/list/list.css");

    var pageData = new Observable();
    pageData.set("cinemaList", cinema.getAll());

    page.bindingContext = pageData;
};
