var everlive = require('../everlive');

function getCurrent() {
    return everlive.Users.currentUser()
        .then(function (response) {
            var result = response.result;

            if (!result) {
                return {};
            }

            return {
                id: result.Id,
                username: result.Username,
                email: result.Email,
                displayName: result.DisplayName
            };
        });
}

exports.getCurrent = getCurrent;