var view = require('ui/core/view');
var CommentSectionViewModel = require('../../../shared/view-models/comment-section-view-model');
var commentService = require('../../../shared/services/comment-service');
var userService = require('../../../shared/services/user-service');
var _ = require('lodash');

var page;
var pageData;

function loadComments() {
	commentService.getAllByCinemaId(pageData.get('cinemaId'))
		.then(function (response) {
			pageData.set('comments', _.reverse(response.result));
	    }, function (error) {
	    	console.log('Error in comments view: ' + error.message);
	    });
}

function onNavigatedTo(args) {
	page = args.object;

	pageData = new CommentSectionViewModel({
		cinemaId: page.navigationContext.cinemaId
	});

	page.bindingContext = pageData;
	loadComments();
}

function submitComment() {
	var cinemaId = pageData.get('cinemaId');
	var text = pageData.get('commentToSubmit');

	if (text.length) {
		userService.getCurrent()
			.then(function (response) {
				commentService.create({
					text: text,
					from: response.result.Username,
					cinemaId: cinemaId
				}).then(loadComments);
			});
	}

	// hide keyboard
	view.getViewById(page, 'comment-to-add').dismissSoftInput();
	pageData.set('commentToSubmit', '')
}

exports.onNavigatedTo = onNavigatedTo;
exports.submitComment = submitComment;