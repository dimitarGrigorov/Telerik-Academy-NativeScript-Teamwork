var Everlive = require('../../libs/everlive.all.min');
var everlive = require('../everlive');
var endpoint = 'Comments';
var _ = require('lodash');

function format(data, query) {
    return data.get(query)
        .then(function (response) {
            return _.map(response.result, function (comment) {
                return {
                    id: comment.Id,
                    from: comment.From,
                    text: comment.Text,
                    createdAt: comment.CreatedAt,
                    cinemaId: comment.CinemaId
                };
            });
        }, function (error) {
            console.log('Error in fetching comments: ' + error.message);
        });
}

function getSortedByCinemaId(cinemaId) {
    var data = everlive.data(endpoint);
    var query = new Everlive.Query();

    query
        .orderDesc('CreatedAt')
        .where()
        .equal('CinemaId', cinemaId);

    return format(data, query);
}

function getByCommentAndUserId(commentId, userId) {
    var data = everlive.data(endpoint);
    var query = new Everlive.Query();

    query.where()
        .equal('Id', commentId)
        .equal('CreatedBy', userId);

    return format(data, query);
}

function destroyByCommentAndUserId(commentId, userId) {
    return everlive.data(endpoint)
        .destroy({
            'Id': commentId,
            'CreatedBy': userId
        });
}

function create(data) {
    return everlive.data(endpoint).create({
        From: data.from,
        Text: data.text,
        CinemaId: data.cinemaId
    });
}

exports.getSortedByCinemaId = getSortedByCinemaId;
exports.getByCommentAndUserId = getByCommentAndUserId;
exports.destroyByCommentAndUserId = destroyByCommentAndUserId;
exports.create = create;