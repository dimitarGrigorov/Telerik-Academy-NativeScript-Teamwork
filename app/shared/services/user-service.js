var everlive = require('../everlive');
var Everlive = require('../../libs/everlive.all.min');
var filesEndpoint = 'Files';

function getCurrent() {
    return everlive.Users.currentUser()
        .then(function(response) {
            var result = response.result;

            if (!result) {
                throw new Error('Log in first...');
            }

            return {
                id: result.Id,
                createdAt: result.CreatedAt,
                username: result.Username,
                email: result.Email,
                displayName: result.DisplayName
            };
        });
}

function getProfilePicture(userId) {
    var data = everlive.data(filesEndpoint);
    var query = new Everlive.Query();

    query.where().equal('CreatedBy', userId);

    return data.get(query);
}

exports.getCurrent = getCurrent;
exports.getProfilePicture = getProfilePicture;
