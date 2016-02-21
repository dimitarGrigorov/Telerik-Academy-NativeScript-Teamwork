var observableModule = require('data/observable');

function CinemaViewModel(data) {
	data = data || {};

	var viewModel = new observableModule.Observable({
		id: data.Id || '',
		name: data.Name || '',
		location: data.Location || '',
		imageUrl: data.ImageUrl || '',
		keywords: data.Keywords || []
	});

	return viewModel;
}

module.exports = CinemaViewModel;