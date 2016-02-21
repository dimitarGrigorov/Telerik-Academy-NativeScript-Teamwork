var observableModule = require('data/observable');
var moment = require('moment');

function CommentViewModel(data) {
	data = data || {};

	var viewModel = new observableModule.Observable({
		from: data.from || '',
		text: data.text || '',
		formattedDate: moment(data.createdAt).fromNow(),
		cinemaId: data.cinemaId || ''
	});

	return viewModel;
}

module.exports = CommentViewModel;