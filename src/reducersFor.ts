import actionTypesFor  from './actionTypesFor';
import constants       from './constants';
import createError     from './reducers/create/error';
import createStart     from './reducers/create/start';
import createSuccess   from './reducers/create/success';
import deleteError     from './reducers/delete/error';
import deleteStart     from './reducers/delete/start';
import deleteSuccess   from './reducers/delete/success';
import fetchSuccess    from './reducers/fetch/success';
import updateError     from './reducers/update/error';
import updateStart     from './reducers/update/start';
import updateSuccess   from './reducers/update/success';

const assign           = require('lodash.assign');

function emptyState(config) {
  return [];
}

const defaultDeps = {
  createError,
  createStart,
  createSuccess,
  deleteError,
  deleteStart,
  deleteSuccess,
  fetchSuccess,
  updateError,
  updateStart,
  updateSuccess,
}

function reducersFor(resourceName, args, deps?) {
  if (resourceName == null) throw new Error('reducersFor: Expected resourceName');

  args = args || {};
  deps = assign(defaultDeps, deps);

  var defaults    = {
    key:          constants.DEFAULT_KEY,
    resourceName: resourceName,
  };

  var config      = assign(defaults, args);

  return function reducers(state, action) {
    state = state || emptyState(config);

    if (action == null) throw new Error(resourceName + ' reducers: Expected action');

    var actionTypes = actionTypesFor(resourceName);
    var record      = action.record;

    switch (action.type) {

      case actionTypes.fetchSuccess:
        return deps.fetchSuccess(config, state, action.records);

      case actionTypes.createStart:
        return deps.createStart(config, state, record);

      case actionTypes.createSuccess:
        return deps.createSuccess(config, state, record, action.cid);

      case actionTypes.createError:
        return deps.createError(config, state, record);

      case actionTypes.updateStart:
        return deps.updateStart(config, state, record);

      case actionTypes.updateSuccess:
        return deps.updateSuccess(config, state, record);

      case actionTypes.updateError:
        return deps.updateError(config, state, record);

      case actionTypes.deleteStart:
        return deps.deleteStart(config, state, record);

      case actionTypes.deleteSuccess:
        return deps.deleteSuccess(config, state, record);

      case actionTypes.deleteError:
        return deps.deleteError(config, state, record);

      default:
        return state;
    }

  }

}

export default reducersFor;
