var observableModule = require('data/observable');

function CommentSectionViewModel(data) {
	data = data || {};

	var viewModel = new observableModule.Observable({
		cinemaId: data.cinemaId || null,
		comments: data.comments || [],
		commentToSubmit: data.commentToSubmit || ''
	});

	return viewModel;
}

module.exports = CommentSectionViewModel;