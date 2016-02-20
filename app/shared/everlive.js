var Everlive = require('../libs/everlive.all.min.js');
var config = require('./config');

module.exports = new Everlive(config.appId);