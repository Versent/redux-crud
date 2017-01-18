import reject            from 'lodash.reject';
import common            from '../common';
import constants         from '../../constants';

export default function success(config, current, record) {
  var reducerName = 'deleteSuccess';

  record = common(config, current, record, reducerName);

  var key = config.key;
  var deleteId = record[key];

  function predicate(existingRecord) {
    return deleteId == existingRecord[key];
  };
  
  return reject(current, predicate);
}
