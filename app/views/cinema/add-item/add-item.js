var view = require('ui/core/view');
var dialogsModule = require('ui/dialogs');
var frameModule = require('ui/frame');
var utils = require('../../../shared/utils');
var cinemaService = require('../../../shared/services/cinema-service');

var page;
var pageData;

function alert(message) {
    dialogsModule.alert({
        message: message,
        okButtonText: 'OK'
    });
}

function navigatedTo(args) {
    page = args.object;
}

function submitCinema(args) {
    var name = page.getViewById('name').text;
    var location = page.getViewById('location').text;
    var imageUrl = page.getViewById('image-url').text;
    var keywords = utils.getKeywords(page.getViewById('keywords').text);
    
    if (name == null || name === ''){
        alert('Name is required!');
        return;
    }

    if (location == null || location === ''){
        alert('Location is required!');
        return;
    }

    if (imageUrl == null || imageUrl === ''){
        alert('Image URL is required!');
        return;
    }

    if (!utils.validateUrl(imageUrl)){
        alert('Please enter valid image URL!');
        return;
    }

    if (!keywords.length) {
        alert('You should specify at least 1 keyword!');
        return;
    }

    var cinema = {
        name: name,
        location: location,
        imageUrl: imageUrl,
        keywords: keywords
    };

    cinemaService
        .addCinema(cinema)
        .then(function(response) {
            dialogsModule.alert({
                message: 'You have successfully added a new cinema!',
                okButtonText: 'OK'
            }).then(function() {
                frameModule.topmost().navigate('views/cinema/list/list');
            });
        }, function(error) {
            dialogsModule.alert({
                message: 'An error occured while trying to add a new cinema. Please try again!',
                okButtonText: 'OK'
            });
        });
}

exports.navigatedTo = navigatedTo;
exports.submitCinema = submitCinema;
