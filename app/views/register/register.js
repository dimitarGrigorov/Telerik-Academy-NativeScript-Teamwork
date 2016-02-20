var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");
var UserViewModel = require("../../shared/view-models/user-view-model");
var user = new UserViewModel();

function loaded(args) {
    var page = args.object;
    page.bindingContext = user;
};

function register() {
    user.register()
        .then(function() {
            dialogsModule
                .alert("Your account was successfully created.")
                .then(function() {
                    frameModule.topmost().navigate("views/login/login");
                });
        }).catch(function(error) {
            dialogsModule.alert({
                message: error,
                okButtonText: "OK"
            });
        });
};

exports.loaded = loaded;
exports.register = register;