var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");
var ImageModule = require("ui/image");
var cinemaService = require("../../../shared/services/cinema-service");

function onNavigatedTo(args) {
	var page = args.object;

	// TODO: get id from navigation's context
	var data = cinemaService.getById(1, function (result) {
		if (!result.error) {
			page.bindingContext = result.value;
		}
	});
}

exports.onNavigatedTo = onNavigatedTo;