import isArray from 'lodash.isarray';

export default function(config, scope, record) {
  if (isArray(record)) throw new TypeError(scope + ': Expected record not to be an array');
}
