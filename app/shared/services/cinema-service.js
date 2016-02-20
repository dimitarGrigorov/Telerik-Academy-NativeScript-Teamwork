var Everlive = require("../../libs/everlive.all.min");
var everlive = require("../../shared/everlive");
var endpoint = 'Cinemas';

function getCinemaList(offset, limit, name) {
    var name = name || null;

    var data = everlive.data(endpoint);

    var query = new Everlive.Query();

    if (name == null || name.length == 0) {
        query
            .skip(offset)
            .take(limit);
    } else {
        query
            .where()
            .or()
            .startsWith('name', name)
            .endsWith('name', name);
    }

    return data.get(query);
}

exports.getCinemaList = getCinemaList;
