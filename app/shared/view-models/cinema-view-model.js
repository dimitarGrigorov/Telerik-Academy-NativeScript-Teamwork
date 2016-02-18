var config = require("../../shared/config");
var firebase = require("nativescript-plugin-firebase");
var observableModule = require("data/observable");

function Cinema() {

    var viewModel = new observableModule.Observable();

    viewModel.getAll = function() {
        // TODO: use database...
        var array = [];
        array.push({ name: "Arena Mladost" });
        array.push({ name: "Arena Zapad" });
        array.push({ name: "Arena Zapad" });
        array.push({ name: "Arena Zapad" });
        array.push({ name: "Arena Zapad" });
        array.push({ name: "Arena Zapad" });
        array.push({ name: "Arena Zapad" });

        array.push({ name: "Arena Zapad" });
        array.push({ name: "Arena Zapad" });
        array.push({ name: "Arena Zapad" });
        array.push({ name: "Arena Zapad" });
        array.push({ name: "Arena Zapad" });
        array.push({ name: "Arena Zapad" });
        array.push({ name: "Arena Zapad" });
        array.push({ name: "Arena Zapad" });
        array.push({ name: "Arena Zapad" });

        array.push({ name: "Arena Zapad" });
        array.push({ name: "Arena Zapad" });
        array.push({ name: "Arena Zapad" });
        array.push({ name: "Arena Zapad" });
        return array;
    };

    return viewModel;
}

module.exports = Cinema;
