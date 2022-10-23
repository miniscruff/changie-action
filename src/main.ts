import * as path from "path";
import * as context from "./context";
import * as changie from "./changie";
import * as core from "@actions/core";
import * as exec from "@actions/exec";

async function run(): Promise<void> {
  try {
    const inputs: context.Inputs = await context.getInputs();
    core.debug(`Changie inputs ${inputs}`);

    const bin = await changie.install(inputs.version);
    core.info(`Changie ${inputs.version} installed successfully`);

    const changieDir = path.dirname(bin);
    core.addPath(changieDir);
    core.debug(`Added ${changieDir} to PATH`);

    core.debug(`Running changie: '${inputs.args}'`);
    await exec.exec(`${bin} ${inputs.args}`, undefined, {});
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
