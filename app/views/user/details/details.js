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

    page.bindingContext = pageData;

    userService.getCurrent()
        .then(function(userDetails) {
            pageData.set('username', userDetails.displayName);
            pageData.set('createdAt', moment(userDetails.createdAt).format('Do MMMM YYYY, h:mm:ss a'));

            userService.getProfilePicture(userDetails.id)
                .then(function(response) {
                    console.log(JSON.stringify(response));
                    if (response.result.length) {
                        pageData.set('imageUri', response.result[0].Uri);
                    }
                }, function(error) {
                    utils.dialogueAlert(error.message);
                });
        }, function(error) {
            utils.dialogueAlert('Cannot get current user!');
        });
}

exports.navigatedTo = navigatedTo;
