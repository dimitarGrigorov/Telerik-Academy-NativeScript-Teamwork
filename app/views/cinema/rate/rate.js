var dialogsModule = require('ui/dialogs');
var frameModule = require('ui/frame');
var RatingSectionViewModel = require('../../../shared/view-models/rating-section-view-model');
var userService = require('../../../shared/services/user-service');
var ratingService = require('../../../shared/services/rating-service');

var page;
var pageData;
var neverDidRateBeforeMessage = 'Thank you for your feedback!';
var didRateBeforeMessage = 'You have rated this cinema before. You will change your previous vote!';

function onNavigatedTo(args) {
	page = args.object;
	pageData = new RatingSectionViewModel({
		cinemaId: page.navigationContext.cinemaId
	});

	page.bindingContext = pageData;
}

function submitRating(rating) {
	var userId;
	var cinemaId = pageData.get('cinemaId');

	userService.getCurrent().then(function (userData) { // get current user's information
		userId = userData.id;
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

	// Formatting of data should happen in rating service
	ratingService.create({
		value: pageData.getRatingValue(),
		cinemaId: pageData.get('cinemaId')
	}).then(function (response) {
	        dialogsModule
	            .alert(didRateBefore ? didRateBeforeMessage : neverDidRateBeforeMessage)
	            .then(function() {
	                frameModule.topmost().navigate(navigationEntry);
	            });
		}, function(error) {
            dialogsModule.alert({
                message: error.message,
                okButtonText: 'OK'
            });
	    })
}

exports.onNavigatedTo = onNavigatedTo;
exports.submitRating = submitRating;