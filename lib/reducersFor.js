var crudActions     = require('redux-crud-actions');
var SI              = require('seamless-immutable');
var _               = require('lodash');

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

function reducersFor(resourceName, args) {
  args = args || {};
  var defaults    = {
    key:          'id',
    resourceName: resourceName,
  };
  var config      = _.defaults(args, defaults);

  return function reducers(state, action) {
    state = state || SI([]);

    var actionTypes = crudActions.actionTypesFor(resourceName);
    var resources   = action[resourceName];

    switch (action.type) {

      case actionTypes.fetchSuccess:
        return fetchSuccess(config, state, resources);

      case actionTypes.createStart:
        return createStart(config, state, resources);

      case actionTypes.createSuccess:
        return createSuccess(config, state, resources);

      case actionTypes.createError:
        return createError(config, state, resources);

      case actionTypes.updateStart:
        return updateStart(config, state, resources);

      case actionTypes.updateSuccess:
        return updateSuccess(config, state, resources);

      case actionTypes.updateError:
        return updateError(config, state, resources);

      case actionTypes.deleteStart:
        return deleteStart(config, state, resources);

      case actionTypes.deleteSuccess:
        return deleteSuccess(config, state, resources);

      case actionTypes.deleteError:
        return deleteError(config, state, resources);

      default:
        return state;
    }

  }

}

module.exports = reducersFor;
