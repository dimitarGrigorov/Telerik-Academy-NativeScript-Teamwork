var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var UserViewModel = require("../../shared/view-models/user-view-model");
var user = new UserViewModel();

exports.loaded = function(args) {
    var page = args.object;

    page.bindingContext = user;
    user.init()
};

exports.signIn = function() {
    user.login()
        .then(function() {
            // frameModule.topmost().navigate("views/some/route");
        }).catch(function(error) {
            dialogsModule.alert({
                message: error,
                okButtonText: "OK"
            });
        });
};

exports.register = function() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/register/register");
};