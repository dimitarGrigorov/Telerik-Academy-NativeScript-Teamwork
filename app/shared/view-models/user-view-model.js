var config = require('../../shared/config');
var observableModule = require('data/observable');
var everlive = require('../everlive');

function UserViewModel(data) {
    data = data || {};

    var viewModel = new observableModule.Observable({
        username: data.username || 'johndoe',
        password: data.password || "password",
        name: 'John Doe',
        email: data.email || 'ns-testing@gmail.com'
    });

    viewModel.login = function() {
        var username = viewModel.get('username');
        var password = viewModel.get('password');

        return everlive.authentication.login(username, password);
    };

    viewModel.addProfilePicture = function(image) {
        var data = everlive.data('ProfilePicture');
        return data.create({ 'ProfilePicture': image });
    };

    viewModel.register = function() {
        var username = viewModel.get('username');
        var password = viewModel.get('password');
        var name = viewModel.get('name');
        var email = viewModel.get('email');

        return everlive.Users.register(username, password, {
            Email: email,
            DisplayName: name
        });
    };

    return viewModel;
}

module.exports = UserViewModel;
