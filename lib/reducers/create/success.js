var _                 = require('lodash');
var common            = require('../common');

function success(config, current, addedRecord, clientGenKey) {
  var reducerName = 'createSuccess';

  addedRecord = common(config, current, addedRecord, reducerName);

  var key = config.key;
  var done = false;

  // update existing records
  var updatedCollection = current.map(function (record) {
    var recordKey = record[key];
    if (recordKey == null) throw new Error('Expectec record to have ' + key);

    var isSameKey = recordKey === addedRecord[key];
    var isSameClientGetKey = (clientGenKey != null && clientGenKey === recordKey);
    if (isSameKey || isSameClientGetKey) {
      done = true;
      return addedRecord;
    } else {
      return record;
    }
  });

  // add if not updated
  if (!done) {
    updatedCollection = updatedCollection.concat([addedRecord]);
  }

  return updatedCollection;
}

module.exports = success;
