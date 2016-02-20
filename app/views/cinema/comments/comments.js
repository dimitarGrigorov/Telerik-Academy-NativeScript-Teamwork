var view = require('ui/core/view');
var CommentSection = require('../../../shared/view-models/comment-section-view-model');
var commentService = require('../../../shared/services/comment-service');
var _ = require('lodash');

var page;
var pageData;

function loadComments() {
    commentService.getAllByCinemaId(pageData.get('cinemaId'))
		.then(function (data) {
			pageData.set('comments', _.reverse(data.result));
	    }, function (error) {
	    	console.log('Error in comments view: ' + error.message);
	    });
}

function onNavigatedTo(args) {
	page = args.object;

	pageData = new CommentSection({
		cinemaId: page.navigationContext.cinemaId
	});

	page.bindingContext = pageData;
	loadComments();
}

function submitComment() {
	commentService.create({
		from: 'User', // TODO: change this
		cinemaId: pageData.get('cinemaId'),
		text: pageData.get('commentToSubmit')
	}).then(function () {
		loadComments();
	}, function (error) {
		console.log('Error in submitting comment: ' + error);
	});

	// hide keyboard
	view.getViewById(page, 'comment-to-add').dismissSoftInput();
	pageData.set('commentToSubmit', '')
}

exports.onNavigatedTo = onNavigatedTo;
exports.submitComment = submitComment;