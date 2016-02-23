var _                 = require('lodash');
var common            = require('../common');
var constants         = require('../../../constants');
var fromJS            = require('immutable').fromJS;

function success(config, current, addedRecord, clientGenKey) {
  var reducerName = 'createSuccess';

  addedRecord = common(config, current, addedRecord, reducerName);

  if (config.store === constants.STORE_IMMUTABLE) {
    addedRecord = addedRecord.toJS();
  }

  var key = config.key;
  var done = false;

  // update existing records
  var updatedCollection = current.map(function (record) {
    if (config.store === constants.STORE_IMMUTABLE) {
      record = record.toJS();
    }
    var recordKey = record[key];
    if (recordKey == null) throw new Error('Expected record to have ' + key);
    var isSameKey = recordKey === addedRecord[key];
    var isSameClientGetKey = (clientGenKey != null && clientGenKey === recordKey);
    if (isSameKey || isSameClientGetKey) {
      done = true;
      if (config.store === constants.STORE_IMMUTABLE) {
        addedRecord = fromJS(addedRecord);
      }
      return addedRecord;
    } else {
      if (config.store === constants.STORE_IMMUTABLE) {
        record = fromJS(record);
      }
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
