var view = require('ui/core/view');
var CommentViewModel = require('../../../shared/view-models/comment-view-model');
var CommentSectionViewModel = require('../../../shared/view-models/comment-section-view-model');
var commentService = require('../../../shared/services/comment-service');
var userService = require('../../../shared/services/user-service');
var _ = require('lodash');

var page;
var pageData;

function loadComments() {
	commentService.getAllByCinemaId(pageData.get('cinemaId'))
		.then(function (response) {
			var comments = _.chain(response.result)
				.map(function (comment) {
					return new CommentViewModel(comment);
				})
				.reverse()
				.value();

			pageData.set('comments', comments);
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
					Text: text,
					From: response.result.Username,
					CinemaId: cinemaId
				}).then(loadComments);
			});
	}

	// hide keyboard
	view.getViewById(page, 'comment-to-add').dismissSoftInput();
	pageData.set('commentToSubmit', '')
}

exports.onNavigatedTo = onNavigatedTo;
exports.submitComment = submitComment;