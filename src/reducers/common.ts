import assertHasKey      from '../utils/assertHasKey';
import assertNotArray    from '../utils/assertNotArray';
import constants         from '../constants';
import wrapArray         from '../utils/wrapArray';

const isArray           = require('lodash.isarray');
const isObject          = require('lodash.isobject');

export default function common(config, current, record, reducerName) {
  if (!config.resourceName)     throw new Error('Expected config.resourceName');
  reducerName = config.resourceName + '.' + reducerName;

  if (!config.key)              throw new Error(reducerName + ': Expected config.key');
  if (!record)                  throw new Error(reducerName + ': Expected record');

  if (config.store === constants.STORE_MAP) {
    if (!isObject(current)) throw new Error(reducerName + ': Expected current to be an object');
  } else {
    if (!isArray(current)) throw new Error(reducerName + ': Expected current to be an array');
  }

  assertNotArray(config, reducerName, record);
  assertHasKey(config, reducerName, record);

  return record;
}
