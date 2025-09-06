import * as path from "path";
import * as context from "./context";
import * as changie from "./changie";
import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as io from "@actions/io";

async function run(): Promise<void> {
  try {
    const inputs: context.Inputs = await context.getInputs();
    core.debug(`Changie inputs ${inputs}`);

    const bin = await changie.install(inputs.version);
    core.info(`Changie ${inputs.version} installed successfully`);

    const changieDir = path.dirname(bin);
    core.addPath(changieDir);
    core.debug(`Added ${changieDir} to PATH`);

    if (inputs.args !== '') {
        if (inputs.workdir && inputs.workdir !== '.') {
          core.info(`Using ${inputs.workdir} as working directory`);
          process.chdir(inputs.workdir);
        }

        core.debug(`Running changie: '${inputs.args}'`);
        const out = await exec.getExecOutput(`${bin} ${inputs.args}`, undefined, {});
        core.setOutput("output", out.stdout);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
