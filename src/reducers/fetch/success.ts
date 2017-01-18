import assertAllHaveKeys  from '../../utils/assertAllHaveKeys';
import constants          from '../../constants';
import isArray            from 'lodash.isarray';
import mergeMutable       from '../../utils/mergeMutable';
import wrapArray          from '../../utils/wrapArray';

export default function success(config, current, records) {
  var reducerName = config.resourceName + '.fetchSuccess';

  if (!config.key)              throw new Error(reducerName + ': Expected config.key');
  if (!isArray(current))        throw new Error(reducerName + ': Expected current to be an array');
  if (!records)                 throw new Error(reducerName + ': Expected records');

  // wrap array
  records = wrapArray(records);

  // All given records must have a key
  assertAllHaveKeys(config, reducerName, records);
  
  return mergeMutable(current, records, config.key);
}
