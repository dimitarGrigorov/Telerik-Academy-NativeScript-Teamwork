var frameModule = require('ui/frame');
var cameraModule = require('camera');
var imageModule = require('ui/image');
var utils = require('../../shared/utils');
var UserViewModel = require('../../shared/view-models/user-view-model');
var user = new UserViewModel();

function loaded(args) {
    var page = args.object;
    page.bindingContext = user;
}

function register() {
    user.register()
        .then(function(response) {
            console.log(JSON.stringify(response));
            utils
                .dialogueAlert('Your account was successfully created.', 'OK')
                .then(function() {
                    user.login()
                        .then(function() {
                            utils.dialogueAction({
                                message: 'Take a profile picture?',
                                cancelButtonText: 'Do nothing...',
                                actions: ['Yes', 'No']
                            }).then(function(result) {
                                if (result === 'Yes') {
                                    cameraModule
                                        .takePicture({ width: 300, height: 300, keepAspectRatio: true })
                                        .then(function(picture) {
                                            return user.addProfilePicture(picture.toBase64String('png'))
                                                .then(function() {
                                                    frameModule.topmost().navigate('views/cinema/list/list');
                                                }, function(error) {
                                                    console.log(JSON.stringify(error));
                                                });
                                        }, function(error) {
                                            console.log(JSON.stringify(error));
                                        });
                                } else {
                                    frameModule.topmost().navigate('views/cinema/list/list');
                                }
                            });
                        });
                });
        }).catch(function(error) {
            utils.dialogueAlert(error.message, 'OK');
        });
}

exports.loaded = loaded;
exports.register = register;
