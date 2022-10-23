import { getOctokit } from "@actions/github";

export const getTag = async (version: string): Promise<string | undefined> => {
    const octokit = getOctokit(process.env.GITHUB_TOKEN as string);
    const baseArgs = {
        owner: "miniscruff",
        repo: "changie",
    };

    if (version.toLowerCase() === "latest") {
        const resp = await octokit.request(
            "GET /repos/{owner}/{repo}/releases/latest",
            baseArgs
        );
        if (resp.status == 200) {
            return resp.data.tag_name;
        }
    } else {
        const resp = await octokit.request(
            "GET /repos/{owner}/{repo}/releases/tags/{tag}",
            {
                ...baseArgs,
                tag: version,
            }
        );
        if (resp.status == 200) {
            return version;
        }
    }
};
