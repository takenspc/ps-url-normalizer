'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { Url } from 'url';
import { RedirectInfo, ExtendedRedirectInfo } from '../';
import { manualRedirect, ManualRedirectEntry } from '../manual';
import * as w3c from './w3c';


//
// Manual
//
const MANUAL_RAW_DATA: ManualRedirectEntry[] = (function() {
    const jsonPath: string = path.join(__dirname, 'data', 'manual.json');
    const rawData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    return rawData;
})();

function wd2ed(url: Url): ExtendedRedirectInfo {
    return manualRedirect(url, MANUAL_RAW_DATA, 'wd2ed', false);
}


//
// WD2ED
//
export function normalize(url: Url): Promise<ExtendedRedirectInfo> {
    const redirecters = [
        wd2ed,
        w3c.wd2ed
    ];

    for (const redirecter of redirecters) {
        const redirectInfo = redirecter(url);
        if (redirectInfo) {
            return Promise.resolve(redirectInfo);
        }
    }

    return Promise.resolve(null);
}
