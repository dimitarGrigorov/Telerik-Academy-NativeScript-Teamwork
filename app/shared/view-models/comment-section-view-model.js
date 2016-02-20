var observableModule = require('data/observable');

function CommentSection(data) {
	data = data || {};

	var viewModel = new observableModule.Observable({
		cinemaId: data.cinemaId || 1,
		comments: data.comments || [],
		addCommentText: data.addCommentText || ''
	});

	return viewModel;
}

module.exports = CommentSection;