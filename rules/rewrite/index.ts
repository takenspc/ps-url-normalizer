'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { Url } from 'url';
import { RedirectInfo, ExtendedRedirectInfo } from '../';
import { manualRedirect, ManualRedirectEntry } from '../manual';
import * as ecma from './ecma';
import * as github from './github';
import * as ietf from './ietf';
import * as w3c from './w3c';
import * as whatwg from './whatwg';
import * as xiph from './xiph';


//
// Manual
//
const MANUAL_RAW_DATA: ManualRedirectEntry[] = (function() {
    const jsonPath: string = path.join(__dirname, 'data', 'manual.json');
    const rawData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    return rawData;
})();

function rewrite(url: Url): ExtendedRedirectInfo {
    return manualRedirect(url, MANUAL_RAW_DATA, 'rewrite', true);
}


//
// Remove default Index
//
function removeDefaultIndex(url: Url): ExtendedRedirectInfo {
    const defaultIndex = /^(.+?\/)(index.html?)$/i;
    
    const matchObject = defaultIndex.exec(url.pathname);
    if (matchObject) {
        const reason = `Remove default index (${matchObject[2]}).`;
        const redirectInfo: RedirectInfo = {
            pathname: matchObject[1],
        };

        return {
            type: 'rewrite',
            reason: reason,
            redirectInfo: redirectInfo,
        };
    }

    return null;
}


//
// Rewrite
//
export async function normalize(url: Url): Promise<ExtendedRedirectInfo> {
    const redirecters = [
        rewrite,
        removeDefaultIndex,
        ecma.rewrite,
        github.rewrite,
        ietf.rewrite,
        w3c.rewrite,
        whatwg.rewrite,
        xiph.rewrite,
    ];

    for (const redirecter of redirecters) {
        const redirectInfo = redirecter(url);
        if (redirectInfo) {
            return Promise.resolve(redirectInfo);
        }
    }

    return Promise.resolve(null);
}