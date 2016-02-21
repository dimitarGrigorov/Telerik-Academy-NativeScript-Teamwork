var observableModule = require('data/observable');

function CommentViewModel(data) {
	data = data || {};

	var viewModel = new observableModule.Observable({
		from: data.From || '',
		text: data.Text || '',
		cinemaId: data.CinemaId || ''
	});

	return viewModel;
}

module.exports = CommentViewModel;