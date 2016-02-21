var observableModule = require('data/observable');
var page;
var pageData;

function onNavigatedTo(args) {
	page = args.object;
	pageData = new observableModule.Observable({
		items: [1, 2, 3, 4, 5],
		selectedIndex: 2
	});

	page.bindingContext = pageData;
}

exports.onNavigatedTo = onNavigatedTo;