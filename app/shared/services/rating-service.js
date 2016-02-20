var Everlive = require('../../libs/everlive.all.min');
var everlive = require('../everlive');
var endpoint = 'Ratings';

function getAll() {
	return everlive.data(endpoint).get();
}

function getAllByCinemaId(cinemaId) {
    var data = everlive.data(endpoint);
	var query = new Everlive.Query();

	query.where().equal('cinemaId', cinemaId);

	return data.get(query);
}

function create(data) {
	return everlive.data(endpoint).create(data)
}

exports.getAll = getAll;
exports.getAllByCinemaId = getAllByCinemaId;
exports.create = create;