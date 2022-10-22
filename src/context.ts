import * as os from "os";
import * as core from "@actions/core";

export const osPlat: string = os.platform();
export const osArch: string = os.arch();

export interface Inputs {
  version: string;
  args: string;
}

export async function getInputs(): Promise<Inputs> {
  return {
    version: core.getInput("version"),
    args: core.getInput("args"),
  };
}
