var frameModule = require('ui/frame');
var RatingSectionViewModel = require('../../../shared/view-models/rating-section-view-model');
var userService = require('../../../shared/services/user-service');
var ratingService = require('../../../shared/services/rating-service');
var utils = require('../../../shared/utils');

var page;
var pageData;
var neverDidRateBeforeMessage = 'Thank you for your feedback!';
var didRateBeforeMessage = 'You have rated this cinema before. You will change your previous vote!';

function navigatedTo(args) {
    page = args.object;
    pageData = new RatingSectionViewModel({
        cinemaId: page.navigationContext.cinemaId
    });

    page.bindingContext = pageData;

    ratingService.getAllByCinemaId(pageData.get('cinemaId'))
        .then(function (response) {
            pageData.set('averageRating', utils.getAverageRating(response));
        }, function (error) {
            utils.dialogueAlert('Cannot get cinema ratings!');
        });
}

function submitRating(rating) {
    var userId;
    var cinemaId = pageData.get('cinemaId');

    userService.getCurrent().then(function (userDetails) { // get current user's information
        userId = userDetails.id;
        return ratingService.getByUserAndCinemaId(userId, cinemaId);
    }).then(function (ratings) { // destroy current user's rating, if such is present
        if (ratings.length) {
            return ratingService.destroyByUserAndCinemaId(userId, cinemaId)
                .then(addRating.bind(this, true));
        }

        return addRating();
    });
}

function addRating(didRateBefore) {
    var navigationEntry = {
        moduleName: 'views/cinema/details/details',
        context: {
            cinemaId: pageData.get('cinemaId')
        },
        clearHistory: true
    };

    ratingService.create({
        value: pageData.getRatingValue(),
        cinemaId: pageData.get('cinemaId')
    }).then(function (response) {
        utils.dialogueAlert(didRateBefore ? didRateBeforeMessage : neverDidRateBeforeMessage)
            .then(function () {
                frameModule.topmost().navigate(navigationEntry);
            });
    }, function (error) {
        utils.dialogueAlert(error.message);
    });
}

exports.navigatedTo = navigatedTo;
exports.submitRating = submitRating;
