var view = require('ui/core/view');
var dialogsModule = require('ui/dialogs');
var frameModule = require('ui/frame');
var cinemaService = require('../../../shared/services/cinema-service');

var page;
var pageData;

function navigatedTo(args) {
    page = args.object;
}

function submitCinema(args) {
    var name = page.getViewById('name');
    var location = page.getViewById('location');
    var imageUrl = page.getViewById('image-url');
    var keywords = page.getViewById('keywords');
    
   if(name === null || name === ''){
       alert('Name is required!');
       return;
   }
   if(location === null || location === ''){
       alert('Location is required!');
       return;
   }
   if(imageUrl === null || imageUrl === ''){
       alert('Image URL is required!');
       return;
   }
   if(!validateUrl(imageUrl)){
       alert('Please enter valid image URL!');
       return;
   }
    
    var cinema = {
        name: name.text,
        location: location.text,
        imageUrl: imageUrl.text,
        keywords: keywords.text.split(',')
    };

    cinemaService
        .addCinema(cinema)
        .then(function(response) {
            dialogsModule.alert({
                message: 'You have successfully added a new cinema!',
                okButtonText: 'OK'
            }).then(function() {
                frameModule.topmost().navigate('views/cinema/list/list');
            });
        }, function(error) {
            dialogsModule.alert({
                message: 'An error occured while trying to add a new cinema. Please try again!',
                okButtonText: 'OK'
            });
        });
}

function validateUrl(textval) {
    var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(textval);
}

exports.navigatedTo = navigatedTo;
exports.submitCinema = submitCinema;
