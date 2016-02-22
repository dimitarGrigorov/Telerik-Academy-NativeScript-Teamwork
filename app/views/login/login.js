var frameModule = require('ui/frame');
var viewModule = require('ui/core/view');
var utils = require('../../shared/utils');
var UserViewModel = require('../../shared/view-models/user-view-model');
var user = new UserViewModel();
var everlive = require('../../shared/everlive');
var page;

function loaded(args) {
    page = args.object;
    page.bindingContext = user;
}

function signIn() {
    var navigationEntry = {
        moduleName: 'views/cinema/list/list',
        clearHistory: true
    };

    user.login()
        .then(function() {
            var loginImage = page.getViewById('login-image');
            loginImage.animate({
                opacity: 0,
                duration: 1000
            }).then(function() {
                frameModule.topmost().navigate(navigationEntry);
            });
        }, function(error) {
            utils.dialogueAlert(error.message);
        });
}

function register() {
    var topmost = frameModule.topmost();
    topmost.navigate('views/register/register');
}

exports.loaded = loaded;
exports.signIn = signIn;
exports.register = register;
