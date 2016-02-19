var firebase = require('nativescript-plugin-firebase');
var config = require('../config'); // TODO: remove
var cinemaRoute = '/cinemas';

function getById(id, callback) {
    return firebase.query(
        callback || onQueryEvent,
        cinemaRoute, {
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'id'
            },
            range: {
                type: firebase.QueryRangeType.EQUAL_TO,
                value: id
            },
            limit: {
                type: firebase.QueryLimitType.LAST,
                value: 1
            }
        }
    )
}

function getAll(offset, limit, callback) {
    return firebase.query(
        callback || onQueryEvent,
        cinemaRoute, {
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'id'
            },
            offset: {
                type: firebase.QueryRangeType.START_AT,
                value: offset
            },
            limit: {
                type: firebase.QueryLimitType.LAST,
                value: limit
            }
        }
    )
}

function onQueryEvent(result) {
    if (!result.error) {
        console.log("Event type: " + result.type);
        console.log("Key: " + result.key);
        console.log("Value: " + JSON.stringify(result.value));
    }
};

exports.getById = getById;
exports.getAll = getAll;
