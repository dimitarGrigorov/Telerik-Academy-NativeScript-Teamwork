var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");
var ImageModule = require("ui/image");
var cinemaService = require("../../../shared/services/cinema-service");
var socialShare = require("nativescript-social-share");
var detailsInfo;

function share() {
	if (!detailsInfo) {
		return;
	}

	var string = 'Looking for a place to watch the new movie, that just came out ? Come to ' + 
		detailsInfo.name + ' at ' + detailsInfo.location + '!';

	socialShare.shareText(string);
}

function onNavigatedTo(args) {
	var page = args.object;

	var data = cinemaService.getById(page.navigationContext.cinemaId, function (result) {
		if (!result.error) {
			detailsInfo = result.value;
			page.bindingContext = result.value;
		}
	});
}

exports.share = share;
exports.onNavigatedTo = onNavigatedTo;