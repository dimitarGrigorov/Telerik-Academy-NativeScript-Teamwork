var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");
var view = require("ui/core/view");
var ImageModule = require("ui/image");
var Observable = require('data/observable').Observable;
var cinemaService = require("../../../shared/services/cinema-service");
var socialShare = require("nativescript-social-share");
var pageData = new Observable();

function share() {
	var cinemaData = pageData.get('cinemaData');

	if (!cinemaData) {
		return;
	}

	var string = 'Looking for a place to watch the new movie, that just came out ? Come to ' + 
		cinemaData.name + ' at ' + cinemaData.location + '!';

	socialShare.shareText(string);
}

function onNavigatedTo(args) {
	var page = args.object;

	pageData.set("isLoading", true);

	view.getViewById(page, 'header').animate({
        opacity: 1,
        duration: 1000
    });	
    
	var data = cinemaService.getById(page.navigationContext.cinemaId, function (result) {
		if (!result.error) {
			pageData.set('cinemaData', result.value);
			pageData.set('isLoading', false);
		}
	});

	page.bindingContext = pageData;
}

exports.share = share;
exports.onNavigatedTo = onNavigatedTo;