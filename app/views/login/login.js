var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var UserViewModel = require("../../shared/view-models/user-view-model");
var user = new UserViewModel();
var everlive = require('../../shared/everlive');
var page;

function loaded(args) {
    page = args.object;
    page.bindingContext = user;
};

function signIn() {
    var navigationEntry = {
        moduleName: "views/cinema/list/list",
        clearHistory: true
    };

    user.login()
        .then(function() {
            frameModule.topmost().navigate(navigationEntry);
        }, function(error) {
            dialogsModule.alert({
                message: error.message,
                okButtonText: "OK"
            });
        });
};

function register() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/register/register");
};

exports.loaded = loaded;
exports.signIn = signIn;
exports.register = register;
