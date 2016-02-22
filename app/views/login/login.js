var dialogsModule = require('ui/dialogs');
var imageModule = require("ui/image");
var frameModule = require('ui/frame');
var viewModule = require('ui/core/view');
var UserViewModel = require('../../shared/view-models/user-view-model');
var user = new UserViewModel();
var everlive = require('../../shared/everlive');
var page;

function loaded(args) {
    if (frameModule.topmost().ios) {
        frameModule.topmost().ios.navBarVisibility = "never";
    }

    var item = new imageModule.Image();

    item.src = "res://icon";
    item.height = 150;

    item.on("loaded", function (args) {

        args.object
            .animate({
                scale: { x: 0.6, y: 0.6 },
                duration: 1500
            })
            .then(function () {
                return args.object.animate({
                    scale: { x: 4, y: 4 },
                    duration: 750
                });
            })
            .then(function () {
                return args.object.animate({
                    opacity: 0,
                    duration: 200
                });
            })
            .then(function () {
                frameModule.topmost().navigate({
                    moduleName: "views/login/login",
                    animated: false
                });
            });
    });
 
    page = args.object;
    page.bindingContext = user;
 
    var grid = page.getViewById("grid");
    grid.addChild(item);
};

function signIn() {
    var navigationEntry = {
        moduleName: 'views/cinema/list/list',
        clearHistory: true
    };

    user.login()
        .then(function() {
            frameModule.topmost().navigate(navigationEntry);
        }, function(error) {
            dialogsModule.alert({
                message: error.message,
                okButtonText: 'OK'
            });
        });
};

function register() {
    var topmost = frameModule.topmost();
    topmost.navigate('views/register/register');
};

exports.loaded = loaded;
exports.signIn = signIn;
exports.register = register;