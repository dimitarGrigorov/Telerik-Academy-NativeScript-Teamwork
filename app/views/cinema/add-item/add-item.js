var view = require('ui/core/view');
var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");
var cinemaService = require("../../../shared/services/cinema-service");

var page;
var pageData;

function navigatedTo(args) {
    page = args.object;
}

function submitCinema(args) {
    var name = page.getViewById('name');
    var location = page.getViewById('location');
    var imageUrl = page.getViewById('image-url');
    var keywords = page.getViewById('keywords');

    var cinema = {
        name: name.text,
        location: location.text,
        imageUrl: imageUrl.text,
        keywords: keywords.text.split(',')
    };

    cinemaService
        .addCinema(cinema)
        .then(function(response) {
            dialogsModule.alert({
                message: "You have successfully added a new cinema!",
                okButtonText: "OK"
            }).then(function() {
                frameModule.topmost().navigate('views/cinema/list/list');
            });
        }, function(error) {
            dialogsModule.alert({
                message: "An error occured while trying to add a new cinema. Please try again!",
                okButtonText: "OK"
            });
        });
}

exports.navigatedTo = navigatedTo;
exports.submitCinema = submitCinema;
