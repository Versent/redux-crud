import isArray  from 'lodash.isarray';

export default function wrapArray(recordOrRecords) {
  return isArray(recordOrRecords) ? recordOrRecords : [recordOrRecords];
};
