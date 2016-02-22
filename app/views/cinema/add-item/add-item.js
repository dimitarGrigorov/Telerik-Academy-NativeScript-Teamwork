var view = require('ui/core/view');
var frameModule = require('ui/frame');
var utils = require('../../../shared/utils');
var cinemaService = require('../../../shared/services/cinema-service');

var page;
var pageData;

function navigatedTo(args) {
    page = args.object;
}

function submitCinema(args) {
    var name = page.getViewById('name').text;
    var location = page.getViewById('location').text;
    var imageUrl = page.getViewById('image-url').text;
    var keywords = utils.getKeywords(page.getViewById('keywords').text);
    
    if (name == null || name === ''){
        utils.dialogueAlert('Name is required!');
        return;
    }

    if (location == null || location === ''){
        utils.dialogueAlert('Location is required!');
        return;
    }

    if (imageUrl == null || imageUrl === ''){
        utils.dialogueAlert('Image URL is required!');
        return;
    }

    if (!utils.validateUrl(imageUrl)){
        utils.dialogueAlert('Please enter valid image URL!');
        return;
    }

    if (!keywords.length) {
        utils.dialogueAlert('You should specify at least 1 keyword!');
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
            utils.dialogueAlert('You have successfully added a new cinema!')
                .then(function() {
                    frameModule.topmost().navigate('views/cinema/list/list');
                });
        }, function(error) {
            utils.dialogueAlert('An error occured while trying to add a new cinema. Please try again!');
        });
}

exports.navigatedTo = navigatedTo;
exports.submitCinema = submitCinema;
