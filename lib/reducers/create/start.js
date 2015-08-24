var _                 = require('lodash');
var common            = require('../common');
var assertNotArray    = require('../../utils/assertNotArray');

function start(config, current, record) {
  var reducerName = 'createStart';
  assertNotArray(config, reducerName, record);

  // record = common(config, current, record, reducerName);

  return current;
}

module.exports = start;
