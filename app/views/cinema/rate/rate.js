var dialogsModule = require('ui/dialogs');
var frameModule = require('ui/frame');
var RatingSectionViewModel = require('../../../shared/view-models/rating-section-view-model');
var userService = require('../../../shared/services/user-service');
var ratingService = require('../../../shared/services/rating-service');

var page;
var pageData;
var neverDidRateBeforeMessage = 'Thank you for your feedback!';
var didRateBeforeMessage = 'You have rated this cinema before. With this action you override your last choice!';

function onNavigatedTo(args) {
	page = args.object;
	pageData = new RatingSectionViewModel({
		cinemaId: page.navigationContext.cinemaId
	});

	page.bindingContext = pageData;
}

function submitRating(rating) {
	var userId;

	userService.getCurrent().then(function (response) { // get current user's information
		userId = response.result.Id;

		return ratingService.getByUserId(userId);
	}).then(function (response) { // destroy current user's rating, if such is present
		if (response.count) {
			return ratingService.destroyByUserId(userId)
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
	    animated: true
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