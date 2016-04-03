'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { Url } from 'url';
import { RedirectInfo, ExtendedRedirectInfo } from '../';
import { url2RedirectInfo } from '../utils';


//
// http://www.specref.org/
//
const SPECREF_TR2ED: Map<string, string> = (function() {
    function addEntryIfNeeded(map: Map<string, string>, trURL: string, edURL: string): void {
        const redirectInfo = url2RedirectInfo(trURL, false);
        if (redirectInfo.host === 'www.w3.org') {
            map.set(redirectInfo.pathname, edURL);
        }
    }

    const jsonPath: string = path.join(__dirname, 'data', 'w3c.json');
    const rawData: any = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

    const map: Map<string, string> = new Map();
    for (const key of Object.keys(rawData)) {
        const entry = rawData[key];
        const edURL = entry.edDraft;
        if (!edURL) {
            continue;
        }

        addEntryIfNeeded(map, entry.href, edURL);
        for (const versionKey of Object.keys(entry.versions)) {
            const versionEntry = entry.versions[versionKey];
            addEntryIfNeeded(map, versionEntry.href, edURL);
        }
    }

    return map;
})();


function specrefOrg(url: Url): ExtendedRedirectInfo {
    const pathname = url.pathname;

    const edURL = SPECREF_TR2ED.get(pathname);
    if (edURL) {
        const redirectInfo = url2RedirectInfo(edURL, false);

        return {
            type: 'wd2ed',
            reason: 'using http://www.specref.org/ data',
            redirectInfo: redirectInfo,
        };
    }

    return null;
}


//
// Entry Point
//
export function wd2ed(url: Url): ExtendedRedirectInfo {
    if (url.host === 'www.w3.org') {
        return specrefOrg(url);
    }

    return null;
}