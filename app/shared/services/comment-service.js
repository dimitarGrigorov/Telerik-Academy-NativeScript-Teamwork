var everlive = require('../everlive');
var commentsEndpoint = 'Comments';

function getAll() {
	return everlive.data(commentsEndpoint).get();
}

function create(data) {
	return everlive.data(commentsEndpoint).create(data)
}

exports.getAll = getAll;
exports.create = create;