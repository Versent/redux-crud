import assertNotArray    from '../../utils/assertNotArray';
import common            from '../common';
import constants         from '../../constants';

const omit              = require('lodash.omit');
const reject            = require('lodash.reject');

import { Config, ResourceCollection } from '../../types'

function errorList(config: Config, current: ResourceCollection, addedRecord: any) {
  var key = config.key;

  function predicate(record: any) {
    var recordKey = record[key];
    var isSameKey = addedRecord[key] === recordKey;
    return isSameKey;
  }

  return reject(current, predicate);
}

function errorMap(config: Config, current: ResourceCollection, addedRecord: any) {
  var key = config.key;
  return omit(current, addedRecord[key]);
}

export default function error(config: Config, current: ResourceCollection, addedRecord: any) {
  var reducerName = 'createError';
  assertNotArray(config, reducerName, addedRecord);

  addedRecord = common(config, current, addedRecord, reducerName);

  if (config.store === constants.STORE_MAP) {
    return errorMap(config, current, addedRecord);
  } else {
    return errorList(config, current, addedRecord);
  }
}
