var observableModule = require('data/observable');

function CommentSection(data) {
	data = data || {};

	var viewModel = new observableModule.Observable({
		cinemaId: data.cinemaId || 1,
		comments: data.comments || [],
		commentToSubmit: data.commentToSubmit || ''
	});

	return viewModel;
}

module.exports = CommentSection;