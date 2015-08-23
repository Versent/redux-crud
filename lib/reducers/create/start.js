var _                 = require('lodash');
var common            = require('../common');

function start(config, current, records) {
  var reducerName = 'createStart';

  // records = common(config, current, records, reducerName);

  return current;
}

module.exports = start;
