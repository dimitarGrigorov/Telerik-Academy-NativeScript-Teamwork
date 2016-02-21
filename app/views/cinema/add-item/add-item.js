var view = require('ui/core/view');
var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");
var Toast = require("nativescript-toast");
var cinemaService = require("../../../shared/services/cinema-service");

var page;

function navigatedTo(args) {
    page = args.object;
}

function submitCinema(args) {
    var name = page.getViewById('name').text;
    var location = page.getViewById('location').text;
    var imageUrl = page.getViewById('image-url').text;
    var keywords = page.getViewById('keywords').text;

    if (name == '' || location == '' || imageUrl == '' || keywords == '') {
        Toast.makeText("Warning: All fields are required and cannot be empty!", "long").show();

        return;
    }

    var cinema = {
        name: name,
        location: location,
        imageUrl: imageUrl,
        keywords: keywords.split(',')
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
