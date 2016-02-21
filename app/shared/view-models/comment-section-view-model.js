var observableModule = require('data/observable');

function CommentSectionViewModel(data) {
	data = data || {};

	var viewModel = new observableModule.Observable({
		cinemaId: data.cinemaId || 1,
		comments: data.comments || [],
		commentToSubmit: data.commentToSubmit || ''
	});

	return viewModel;
}

module.exports = CommentSectionViewModel;