var view = require('ui/core/view');
var CommentSection = require('../../../shared/view-models/comment-section-view-model');
var pageData;

function onNavigatedTo(args) {
	var page = args.object;

	pageData = new CommentSection(page.navigationContext);
	
	page.bindingContext = pageData;
}

exports.onNavigatedTo = onNavigatedTo;