import {Config, ReducerName} from "../types";

export default function makeScope(
  config: Config,
  reducerName: ReducerName
): string {
  return config.resourceName + "." + reducerName;
}
