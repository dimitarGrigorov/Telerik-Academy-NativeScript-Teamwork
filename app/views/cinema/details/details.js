var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var ImageModule = require("ui/image");
var Observable = require('data/observable').Observable;
var cinemaService = require("../../../shared/services/cinema-service");
var utils = require('../../../shared/utils');

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
	var cinemaData = pageData.get('cinemaData');

	if (!cinemaData) {
		return;
	}

    var navigationEntry = {
        moduleName: 'views/cinema/comments/comments',
        context: {
            cinemaId: pageData.get('cinemaId'),
            cinemaKey: pageData.get('cinemaKey'),
            comments: utils.getCollectionItems(pageData.get('cinemaData').comments)
        }
    };

    frameModule.topmost().navigate(navigationEntry);
}


function onNavigatedTo(args) {
	page = args.object;
	// pageData.set("isLoading", true);

	view.getViewById(page, 'header').animate({
        opacity: 1,
        duration: 1000
    });	
    
	var data = cinemaService.getById(page.navigationContext.cinemaId, function random(result) {
		console.log('changed');
		if (!result.error) {
			pageData.set('cinemaId', page.navigationContext.cinemaId);
			pageData.set('cinemaKey', page.navigationContext.key);
			pageData.set('cinemaData', result.value);
			pageData.set('isLoading', false);
			random = 1;
		}
	});

	page.bindingContext = pageData;
}



exports.share = share;
exports.showCommentSection = showCommentSection;
exports.onNavigatedTo = onNavigatedTo;