var dialogsModule = require('ui/dialogs');
var frameModule = require('ui/frame');
var view = require('ui/core/view');
var ImageModule = require('ui/image');
var Observable = require('data/observable').Observable;
var cinemaService = require('../../../shared/services/cinema-service');
var ratingService = require('../../../shared/services/rating-service');
var socialShare = require('nativescript-social-share');
var _ = require('lodash');

var page;
var pageData = new Observable();

function share() {
	var cinemaData = pageData.get('cinemaData');

	if (!cinemaData) {
		return;
	}

	var string = 'Looking for a place to watch the new movie, that just came out ? Come to ' + 
		cinemaData.name + ' at ' + cinemaData.location + '!';

	pageData.set('cinemaData', '');
	socialShare.shareText(string);
}

function rate() {
    var navigationEntry = {
        moduleName: 'views/cinema/rate/rate',
        context: {
            cinemaId: pageData.get('cinemaId')
        }
    };

    frameModule.topmost().navigate(navigationEntry);
}

function showCommentSection() {
	if (!pageData.get('cinemaId')) {
		return;
	}

    var navigationEntry = {
        moduleName: 'views/cinema/comments/comments',
        context: {
            cinemaId: pageData.get('cinemaId')
        }
    };

    frameModule.topmost().navigate(navigationEntry);
}

function calculateRating() {
	ratingService.getAllByCinemaId(pageData.get('cinemaId'))
		.then(function (response) {
			var sum = _.chain(response.result)
				.map(function (rating) {
					return rating.value;
				})
				.reduce(function (a, b) {
					return a + b;
				})

			setRatingClasses(Math.round(sum / response.result.length));
		})
}

function setRatingClasses(roundedRating) {
	var itemCount = 5;
	var defaultClass = 'rating-item';
	var activeClass = 'rating-item-active';

	var newCollection = _.range(1, itemCount + 1).map(function (starRating) {
		return starRating <= roundedRating ? (defaultClass + ' ' + activeClass) : defaultClass;
	});

	pageData.set('ratingClasses', newCollection);
	pageData.set('isLoading', false);
}

function onNavigatedTo(args) {
	page = args.object;
	pageData.set('isLoading', true);
	calculateRating();

	view.getViewById(page, 'header').animate({
        opacity: 1,
        duration: 1000
    });

    cinemaService.getById(page.navigationContext.cinemaId)
    	.then(function (response) {
			pageData.set('cinemaId', page.navigationContext.cinemaId);
			pageData.set('cinemaData', response.result);
    	}, function (error) {
    		console.log('Error in details view: ' + error.message);
    	});

	page.bindingContext = pageData;
}

exports.share = share;
exports.rate = rate;
exports.showCommentSection = showCommentSection;
exports.onNavigatedTo = onNavigatedTo;