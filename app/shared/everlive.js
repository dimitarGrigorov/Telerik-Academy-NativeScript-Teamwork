var Everlive = require('../libs/everlive.all.min');
var config = require('./config');

module.exports = new Everlive(config.appId);