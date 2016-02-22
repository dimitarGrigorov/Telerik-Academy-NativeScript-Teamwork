var dialogsModule = require('ui/dialogs');
var frameModule = require('ui/frame');
var cameraModule = require('camera');
var imageModule = require('ui/image');
var fs = require('file-system');
var UserViewModel = require('../../shared/view-models/user-view-model');
var user = new UserViewModel();

function loaded(args) {
    var page = args.object;
    page.bindingContext = user;
};

function register() {
    user.register()
        .then(function() {
            dialogsModule
                .alert({
                    message: 'Your account was successfully created.',
                    okButtonText: 'OK'
                })
                .then(function() {
                    frameModule.topmost().navigate('views/login/login');
                });
        }).catch(function(error) {
            dialogsModule.alert({
                message: error.message,
                okButtonText: 'OK'
            });
        });
};

function takeProfilePicture() {
    cameraModule
        .takePicture({ width: 300, height: 300, keepAspectRatio: true })
        .then(function(picture) {
            console.log('Result is an image source instance');
            var image = new imageModule.Image();
            var folder = fs.knownFolders.documents();
            var path = fs.path.join(folder.path, 'Test.png');
            console.log(path);
            var saved = image.saveToFile(path, enums.ImageFormat.png);
        });
}

exports.loaded = loaded;
exports.register = register;
exports.takeProfilePicture = takeProfilePicture;
