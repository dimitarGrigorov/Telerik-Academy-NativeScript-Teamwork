var Everlive = require('../../libs/everlive.all.min');
var everlive = require('../everlive');
var endpoint = 'Comments';
var _ = require('lodash');

function format(data, query) {
	return data.get(query)
		.then(function (response) {
			return _.map(response.result, function (comment) {
				return {
					from: comment.From,
					text: comment.Text,
					createdAt: comment.CreatedAt,
					cinemaId: data.CinemaId
				};
			});
		}, function (error) {
			console.log('Error in fetching comments: ' + error.message);
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
		From: data.from,
		Text: data.text,
		CinemaId: data.cinemaId
	});
}

exports.getAllByCinemaId = getAllByCinemaId;
exports.create = create;