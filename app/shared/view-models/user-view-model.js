var config = require("../../shared/config");
var firebase = require("nativescript-plugin-firebase");
var observableModule = require("data/observable");

function User(info) {
    info = info || {};

    var viewModel = new observableModule.Observable({
        email: info.email || "ns-testing@gmail.com",
        password: info.password || "password"
    });

    viewModel.init = function() {
        firebase.init({
            url: config.apiUrl
          }).then(
              function (instance) {
                console.log("firebase.init done");
              },
              function (error) {
                console.log("firebase.init error: " + error);
              }
          );
    };

    viewModel.login = function() {
        return firebase.login({
            type: firebase.LoginType.PASSWORD,
            email: viewModel.get("email"),
            password: viewModel.get("password")
          }).then(
            function (response) {
                console.log(response);
                config.uid = response.uid
                return response;
            });
    };

    viewModel.register = function() {
        return firebase.createUser({
            email: viewModel.get("email"),
            password: viewModel.get("password")
          }).then(
              function (response) {
                console.log(response);
                return response;
              }
          )
    };

    return viewModel;
}

module.exports = User;