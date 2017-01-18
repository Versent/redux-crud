import assertNotArray    from '../../utils/assertNotArray';
import common            from '../common';
import constants         from '../../constants';
import omit              from 'lodash.omit';
import reject            from 'lodash.reject';

function errorList(config, current, addedRecord) {
  var key = config.key;

  function predicate(record) {
    var recordKey = record[key];
    var isSameKey = addedRecord[key] === recordKey;
    return isSameKey;
  }

  return reject(current, predicate);
}

function errorMap(config, current, addedRecord) {
  var key = config.key;
  return omit(current, addedRecord[key]);
}

export default function error(config, current, addedRecord) {
  var reducerName = 'createError';
  assertNotArray(config, reducerName, addedRecord);

  addedRecord = common(config, current, addedRecord, reducerName);

  if (config.store === constants.STORE_MAP) {
    return errorMap(config, current, addedRecord);
  } else {
    return errorList(config, current, addedRecord);
  }
}
