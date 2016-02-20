var Observable = require('data/observable').Observable;
var pageData;

function onNavigatedTo(args) {
	var page = args.object;

	pageData = new Observable(page.navigationContext);

	page.bindingContext = pageData;
}

exports.onNavigatedTo = onNavigatedTo;