var _ = require('lodash');

function getCollectionItems(collection) {
	return _.map(collection, function (item) {
		return item;
	});
}

exports.getCollectionItems = getCollectionItems;