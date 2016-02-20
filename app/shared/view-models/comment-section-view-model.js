var observableModule = require('data/observable');

function CommentSection(data) {
	data = data || {};

	var viewModel = new observableModule.Observable({
		cinemaId: data.cinemaId || 1,
		cinemaKey: data.cinemaKey || '',
		comments: data.comments || [],
		commentToSubmit: data.commentToSubmit || ''
	});

	return viewModel;
}

module.exports = CommentSection;