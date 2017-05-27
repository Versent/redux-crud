import * as r from "ramda";

import actionTypesFor from "../../actionTypesFor";
import constants from "../../constants";

import {Config, ReducerName} from "../../types";

function reducersFor(resourceName: string, args = {}, emptyState, reducers) {
  if (resourceName == null)
    throw new Error("reducersFor: Expected resourceName");

  var defaults = {
    key: constants.DEFAULT_KEY,
    resourceName: resourceName
  };

  var config = r.merge(defaults, args);

  return function getReducer(state, action) {
    state = state || emptyState;

    if (action == null)
      throw new Error(resourceName + " reducers: Expected action");

    var actionTypes = actionTypesFor(resourceName);
    var record = action.record;

    switch (action.type) {
      case actionTypes.fetchSuccess:
        return reducers.fetchSuccess(
          config,
          state,
          action.records,
          emptyState,
          action.data && action.data.replace
        );

      case actionTypes.createStart:
        return reducers.createStart(config, state, record);

      case actionTypes.createSuccess:
        return reducers.createSuccess(config, state, record, action.cid);

      case actionTypes.createError:
        return reducers.createError(config, state, record);

      case actionTypes.updateStart:
        return reducers.updateStart(config, state, record);

      case actionTypes.updateSuccess:
        return reducers.updateSuccess(config, state, record);

      case actionTypes.updateError:
        return reducers.updateError(config, state, record);

      case actionTypes.deleteStart:
        return reducers.deleteStart(config, state, record);

      case actionTypes.deleteSuccess:
        return reducers.deleteSuccess(config, state, record);

      case actionTypes.deleteError:
        return reducers.deleteError(config, state, record);

      default:
        return state;
    }
  };
}

export default reducersFor;
