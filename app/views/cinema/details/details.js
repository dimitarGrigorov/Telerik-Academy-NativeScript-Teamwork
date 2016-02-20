var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var ImageModule = require("ui/image");
var Observable = require('data/observable').Observable;
// var cinemaService = require("../../../shared/services/cinema-service");
var utils = require('../../../shared/utils');
var everlive = require("../../../shared/everlive"); // TODO: remove
var socialShare = require("nativescript-social-share");

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


function onNavigatedTo(args) {
	page = args.object;
	pageData.set("isLoading", true);

	view.getViewById(page, 'header').animate({
        opacity: 1,
        duration: 1000
    });

    // TODO: get item from cinema-service
    everlive.data('Cinemas').getById(page.navigationContext.cinemaId)
    	.then(function (data) {
			pageData.set('cinemaId', page.navigationContext.cinemaId);
			pageData.set('cinemaData', data.result);
			pageData.set('isLoading', false);
    	}, function (error) {
    		console.log('Error in details view: ' + error.message);
    	});


	page.bindingContext = pageData;
}



exports.share = share;
exports.showCommentSection = showCommentSection;
exports.onNavigatedTo = onNavigatedTo;