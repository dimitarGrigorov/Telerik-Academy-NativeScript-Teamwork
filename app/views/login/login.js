var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var UserViewModel = require("../../shared/view-models/user-view-model");
var user = new UserViewModel();

function loaded(args) {
    var page = args.object;

    page.bindingContext = user;
    user.init()
};

function signIn() {
    user.login()
        .then(function() {
            frameModule.topmost().navigate("views/cinema/list/list");
        }).catch(function(error) {
            dialogsModule.alert({
                message: error,
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