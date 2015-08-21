var crudActions     = require('redux-crud-actions');
var SI              = require('seamless-immutable');

var fetchSuccess    = require('./reducers/fetch/success');
var createStart     = require('./reducers/create/start');
var createSuccess   = require('./reducers/create/success');
var createError     = require('./reducers/create/error');
var updateStart     = require('./reducers/update/start');
var updateSuccess   = require('./reducers/update/success');
var updateError     = require('./reducers/update/error');
var deleteStart     = require('./reducers/delete/start');
var deleteSuccess   = require('./reducers/delete/success');
var deleteError     = require('./reducers/delete/error');

function reducersFor(resourceName) {

  return function reducers(state, action) {
    state = state || SI([]);

    var actionTypes = crudActions.actionTypesFor(resourceName);
    var resources   = action[resourceName];

    switch (action.type) {

      case actionTypes.fetchSuccess:
        return fetchSuccess(resourceName, state, resources);

      case actionTypes.createStart:
        return createStart(resourceName, state, resources);

      case actionTypes.createSuccess:
        return createSuccess(resourceName, state, resources);

      case actionTypes.createError:
        return createError(resourceName, state, resources);

      case actionTypes.updateStart:
        return updateStart(resourceName, state, resources);

      case actionTypes.updateSuccess:
        return updateSuccess(resourceName, state, resources);

      case actionTypes.updateError:
        return updateError(resourceName, state, resources);

      case actionTypes.deleteStart:
        return deleteStart(resourceName, state, resources);

      case actionTypes.deleteSuccess:
        return deleteSuccess(resourceName, state, resources);

      case actionTypes.deleteError:
        return deleteError(resourceName, state, resources);

      default:
        return state;
    }

  }

}

module.exports = reducersFor;
