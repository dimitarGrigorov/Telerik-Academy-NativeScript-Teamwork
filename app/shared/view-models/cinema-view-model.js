var config = require("../../shared/config");
var firebase = require("nativescript-plugin-firebase");
var observableModule = require("data/observable");

function Cinema() {

    var viewModel = new observableModule.Observable();

    viewModel.getAll = function() {
        // TODO: use database...
        var array = [];

        array.push({ id: 1, rating: 5, name: "Arena Mladost", url: "~/images/cinema.png" });
        array.push({ id: 2, rating: 5, name: "Arena Zapad", url: "~/images/cinema.png" });
        array.push({ id: 3, rating: 5, name: "Arena Zapad", url: "~/images/cinema.png" });
        array.push({ id: 4, rating: 5, name: "Arena Zapad", url: "~/images/cinema.png" });
        array.push({ id: 5, rating: 5, name: "Arena Zapad", url: "~/images/cinema.png" });
        
        return array;
    };

    return viewModel;
}

module.exports = Cinema;
