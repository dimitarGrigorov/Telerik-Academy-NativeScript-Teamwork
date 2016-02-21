var observableModule = require('data/observable');
var moment = require('moment');

function CommentViewModel(data) {
	data = data || {};

	var viewModel = new observableModule.Observable({
		from: data.From || '',
		text: data.Text || '',
		formattedDate: moment(data.CreatedAt).fromNow(),
		cinemaId: data.CinemaId || ''
	});

	return viewModel;
}

module.exports = CommentViewModel;