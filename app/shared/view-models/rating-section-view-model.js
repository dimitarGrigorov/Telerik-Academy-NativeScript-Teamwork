var observableModule = require('data/observable');
var defaultRateValues = [1, 2, 3, 4, 5];
var defaultSelectedIndex = 2;

function RatingSectionViewModel(data) {
	data = data || {};

	var viewModel = new observableModule.Observable({
		items: data.items || defaultRateValues,
		selectedIndex: data.selectedIndex || defaultSelectedIndex,
		cinemaId: data.cinemaId || ''
	});

	viewModel.getRateValue = function () {
		return this.items[this.selectedIndex];
	}

	return viewModel;
}

module.exports = RatingSectionViewModel;