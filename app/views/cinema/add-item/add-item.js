var view = require('ui/core/view');
var geolocation = require("nativescript-geolocation");

var pageData;

function onNavigatedTo(args) {
    var page = args.object;

}

function enableLocationTap(args) {
if (!geolocation.isEnabled()) {
        geolocation.enableLocationRequest();
    }

    var location = geolocation.getCurrentLocation({ desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000 }).
    then(function(loc) {
        if (loc) {
            console.log(JSON.stringify(loc));
        }
    }, function(e) {
        console.log("Error: " + e.message);
    });
}


exports.onNavigatedTo = onNavigatedTo;
exports.enableLocationTap = enableLocationTap;
