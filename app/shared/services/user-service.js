var everlive = require('../everlive');
var Everlive = require('../../libs/everlive.all.min');
var filesEndpoint = 'Files';

function getCurrent() {
    return everlive.Users.currentUser()
        .then(function (response) {
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

function getProfilePicture() {
    var data = everlive.data(filesEndpoint);
    var query = new Everlive.Query();
    var userData;

    return getCurrent()
        .then(function (userDetails) {
            userData = userDetails;
            query.where().equal('CreatedBy', userDetails.id);
            
            return data.get(query);
        })
        .then(function (response) { // return first match
            if (response.result.length) {
                return {
                    uri: response.result[0].Uri,
                    userDetails: userData
                };
            }
        });
}

exports.getCurrent = getCurrent;
exports.getProfilePicture = getProfilePicture;