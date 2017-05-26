import actionTypesFor from "../../actionTypesFor";
import constants from "../../constants";
import commonReducersFor from "../common/reducersFor";
import createError from "./create/error";
import createStart from "./create/start";
import createSuccess from "./create/success";
import deleteError from "./delete/error";
import deleteStart from "./delete/start";
import deleteSuccess from "./delete/success";
import fetchSuccess from "./fetch/success";
import updateError from "./update/error";
import updateStart from "./update/start";
import updateSuccess from "./update/success";
import * as r from "ramda";

import {Config, ReducerName} from "../../types";

const baseReducers = {
  createError,
  createStart,
  createSuccess,
  deleteError,
  deleteStart,
  deleteSuccess,
  fetchSuccess,
  updateError,
  updateStart,
  updateSuccess
};

export default function reducersFor(resourceName: string, args = {}, deps?) {
  const reducers = r.merge(baseReducers, deps);
  return commonReducersFor(resourceName, args, {}, reducers);
}
