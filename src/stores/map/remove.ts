const omit              = require('lodash.omit');

import { Config, ResourceCollection } from '../../types'

export default function remove(config: Config, current: ResourceCollection, addedRecord: any) {
  var key = config.key;
  return omit(current, addedRecord[key]);
}
