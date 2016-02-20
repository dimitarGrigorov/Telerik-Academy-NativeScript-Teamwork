var _ = require('lodash');

function sortById(items) {
	var collection = {};

	_.each(items, function (item) {
		if (!collection[item.Id]) {
			collection[item.Id] = [];
		}

		collection[item.Id].push(item);
	});

	return collection;
}

exports.sortById = sortById;