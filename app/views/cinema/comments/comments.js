var view = require('ui/core/view');
var firebase = require("nativescript-plugin-firebase");
var CommentSection = require('../../../shared/view-models/comment-section-view-model');

var page;
var pageData;

function onNavigatedTo(args) {
	page = args.object;
	pageData = new CommentSection(page.navigationContext);

	page.bindingContext = pageData;
}

function submitComment() {
	firebase.push('/cinemas/' + pageData.get('cinemaKey') + '/comments', {
		from: 'User', // TODO: change
		text: pageData.get('commentToSubmit'),
		timestamp: +new Date()
	}).then(function (success) {
		console.log('Success in submitting comment: ' + success);
	}, function (error) {
		console.log('Error in submitting comment: ' + error);
	});

	// hide keyboard
	view.getViewById(page, 'comment-to-add').dismissSoftInput();
}

exports.onNavigatedTo = onNavigatedTo;
exports.submitComment = submitComment;