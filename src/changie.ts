import * as path from "path";
import * as util from "util";
import * as context from "./context";
import * as github from "./github";
import * as core from "@actions/core";
import * as tc from "@actions/tool-cache";

export async function install(version: string): Promise<string> {
    const tag: string | undefined = await github.getTag(version);
    if (!tag) {
        throw new Error(`Cannot find Changie ${version} release`);
    }

    const filename = getFilename(tag);
    const downloadUrl = util.format(
        "https://github.com/miniscruff/changie/releases/download/%s/%s",
        tag,
        filename,
    );

    core.info(`Downloading ${downloadUrl}`);

    const downloadPath: string = await tc.downloadTool(downloadUrl);
    core.debug(`Downloaded to ${downloadPath}`);

    core.info("Extracting Changie");
    let extPath: string;
    if (context.osPlat == "win32") {
        extPath = await tc.extractZip(downloadPath);
    } else {
        extPath = await tc.extractTar(downloadPath);
    }
    core.debug(`Extracted to ${extPath}`);

    const cachePath: string = await tc.cacheDir(extPath, "changie-action", tag);
    core.debug(`Cached to ${cachePath}`);

    const exePath: string = path.join(
        cachePath,
        context.osPlat == "win32" ? "changie.exe" : "changie"
    );
    core.debug(`Exe path is ${exePath}`);

    return exePath;
}

const getFilename = (version: string): string => {
    let arch: string;
    switch (context.osArch) {
        case "x64": {
            arch = "amd64";
            break;
        }
        case "x32": {
            arch = "386";
            break;
        }
        case "arm": {
            arch = "arm64";
            break;
        }
        default: {
            arch = context.osArch;
            break;
        }
    }

    const platform: string =
        context.osPlat == "win32"
            ? "windows"
            : context.osPlat == "darwin"
                ? "darwin"
                : "linux";

    const ext: string = context.osPlat == "win32" ? "zip" : "tar.gz";

    core.debug(`osArch: ${context.osArch}`);
    core.debug(`osPlat: ${context.osPlat}`);
    core.debug(`version: ${version}`);
    core.debug(`arch: ${arch}`);
    core.debug(`platform: ${platform}`);
    core.debug(`ext: ${ext}`);

    const filename = `changie_${version.substr(1)}_${platform}_${arch}.${ext}`;
    core.info(`filename: ${filename}`);
    return filename;
};
