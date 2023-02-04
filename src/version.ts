import * as httpm from '@actions/http-client';

interface ChangieVersion {
    latest: string;
}

export const getVersion = async (version: string): Promise<string | undefined> => {
    if (version.toLowerCase() !== "latest") {
        return version;
    }

    const http: httpm.HttpClient = new httpm.HttpClient('changie-action');
    const url: string = 'https://changie.dev/version.json';
    const getVersion = http.getJson<ChangieVersion>(url);
    return getVersion.then(response => {
        if (response.result == null) {
            return undefined;
        }
        return response.result.latest;
    });
};

