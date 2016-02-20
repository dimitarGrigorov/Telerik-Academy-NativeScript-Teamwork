var view = require('ui/core/view');
var geolocation = require("nativescript-geolocation");

var locationModule = require("location");
var LocationManager = require("location").LocationManager;
var isEnabled = LocationManager.isEnabled();

var pageData;

function onNavigatedTo(args) {
    var page = args.object;

}

function enableLocationTap(args) {

    if (!geolocation.isEnabled()) {
        geolocation.enableLocationRequest();
    }
}


function getLocationTap(args) {

    locationModule.getLocation({ maximumAge: 30000, timeout: 10000 }).then(function(location) {
        console.log('Location received: ' + location);
    }, function(error) {
        console.log('Location error received: ' + error);
    });
}


exports.onNavigatedTo = onNavigatedTo;
exports.enableLocationTap = enableLocationTap;
exports.getLocationTap = getLocationTap;
