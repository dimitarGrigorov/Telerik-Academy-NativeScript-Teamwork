var observableModule = require('data/observable');
var moment = require('moment');

function CommentViewModel(data) {
	data = data || {};

	var viewModel = new observableModule.Observable({
        id: data.id || null,
        cinemaId: data.cinemaId || null,
		from: data.from || '',
		text: data.text || '',
		formattedDate: moment(data.createdAt).fromNow()
	});

	return viewModel;
}

module.exports = CommentViewModel;