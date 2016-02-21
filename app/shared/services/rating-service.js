var Everlive = require('../../libs/everlive.all.min');
var everlive = require('../everlive');
var endpoint = 'Ratings';
var _ = require('lodash');

function format(data, query) {
	return data.get(query)
		.then(function (response) {
			return _.map(response.result, function (rating) {
				return {
					value: rating.Value
				};
			});
		}, function (error) {
			console.log('Error in fetching ratings: ' + error.message);
		});
}

function getByUserAndCinemaId(userId, cinemaId) {
    var data = everlive.data(endpoint);
	var query = new Everlive.Query();

	query.where()
		.equal('CreatedBy', userId)
		.equal('CinemaId', cinemaId);

	return format(data, query);
}

function destroyByUserAndCinemaId(userId, cinemaId) {
	return everlive.data(endpoint)
		.destroy({
			'CreatedBy': userId,
			'CinemaId': cinemaId
		});
}

function getAllByCinemaId(cinemaId) {
    var data = everlive.data(endpoint);
	var query = new Everlive.Query();

	query.where().equal('CinemaId', cinemaId);

	return format(data, query);
}

function create(data) {
	return everlive.data(endpoint).create({
		Value: data.value,
		CinemaId: data.cinemaId
	});
}

exports.getByUserAndCinemaId = getByUserAndCinemaId;
exports.destroyByUserAndCinemaId = destroyByUserAndCinemaId;
exports.getAllByCinemaId = getAllByCinemaId;
exports.create = create;