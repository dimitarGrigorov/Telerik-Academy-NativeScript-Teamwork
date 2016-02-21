var Everlive = require('../../libs/everlive.all.min');
var everlive = require('../everlive');
var endpoint = 'Ratings';

function getByUserId(userId) {
    var data = everlive.data(endpoint);
	var query = new Everlive.Query();

	query.where().equal('CreatedBy', userId);

	return data.get(query);
}

function destroyByUserId(userId) {
	return everlive.data(endpoint)
		.destroy({ 'CreatedBy': userId });
}

function getAllByCinemaId(cinemaId) {
    var data = everlive.data(endpoint);
	var query = new Everlive.Query();

	query.where().equal('CinemaId', cinemaId);

	return data.get(query);
}

function create(data) {
	return everlive.data(endpoint).create({
		Value: data.value,
		CinemaId: data.cinemaId
	});
}

exports.getByUserId = getByUserId;
exports.destroyByUserId = destroyByUserId;
exports.getAllByCinemaId = getAllByCinemaId;
exports.create = create;