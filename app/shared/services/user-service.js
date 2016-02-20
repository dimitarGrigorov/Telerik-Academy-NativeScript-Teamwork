var everlive = require('../everlive');

function getCurrent() {
	return everlive.Users.currentUser();
}

exports.getCurrent = getCurrent;