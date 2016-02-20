var dialogsModule = require("ui/dialogs");
var connectivity = require("connectivity");
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
    var connectionType = connectivity.getConnectionType();

    if (connectionType != connectivity.connectionType.none) {
        user.login()
            .then(function() {
                frameModule.topmost().navigate("views/cinema/list/list");
            }, function(error) {
                dialogsModule.alert({
                    message: error.message,
                    okButtonText: "OK"
                });
            });
    } else {
        dialogsModule.alert({
            message: "Login requires an Internet connection!",
            okButtonText: "OK"
        });
    }
};

function register() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/register/register");
};

exports.loaded = loaded;
exports.signIn = signIn;
exports.register = register;
