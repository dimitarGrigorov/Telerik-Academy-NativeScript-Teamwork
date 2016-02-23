var utils = require('../../../shared/utils');
var Observable = require('data/observable').Observable;
var userService = require('../../../shared/services/user-service');
var moment = require('moment');

var page;
var pageData;

function navigatedTo(args) {
    page = args.object;
    pageData = new Observable({
        imageUri: '',
        username: '',
        createdAt: ''
    });

    userService.getProfilePicture()
        .then(function (image) {
            pageData.set('imageUri', image.uri);
            pageData.set('username', image.userDetails.username);
            pageData.set('createdAt', moment(image.userDetails.createdAt).format('Do MMMM YYYY, h:mm:ss a'));
        }, function (error) {
            utils.dialogueAlert(error.message);
        });

    page.bindingContext = pageData;
}

exports.navigatedTo = navigatedTo;