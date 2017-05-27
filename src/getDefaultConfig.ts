import {Config} from "./types";

export default function getDefaultConfig(resourceName: string): Config {
  return {
    key: "id",
    resourceName
  };
}
