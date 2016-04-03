'use strict'; // XXX
import * as fs from 'fs';
import * as path from 'path';
import { Url, format } from 'url';
import { RedirectInfo, ExtendedRedirectInfo } from '../';


//
// html.spec.whatwg.org
//
const HTML_FRAGMENT_DATA: Map<string, string> = (function() {
    const jsonPath: string = path.join(__dirname, 'data', 'fragment-links.json');
    const rawData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

    const map: Map<string, string> = new Map();
    for (const key of Object.keys(rawData)) {
        map.set(key, rawData[key]);
    }

    return map;
})();

function rewriteHTML(hash: string): RedirectInfo {
    if (!hash) {
        return null;
    } 

    const id = hash.substring(1);
    const html = HTML_FRAGMENT_DATA.get(id);
    if (html) {
        return {
            protocol: 'https:',
            host: 'html.spec.whatwg.org',
            pathname: /multipage/ + html + '.html',
            hash: hash,
        };
    }

    return null;
}

function createRedirectInfo(url: Url): ExtendedRedirectInfo {
    const reason = 'use multipage version of HTML Standard https://html.spec.whatwg.org/multipage/';
    const redirectInfo: RedirectInfo = rewriteHTML(url.hash);

    if (!redirectInfo) {
        console.error(format(url), 'Unknown hash');
        return null;
    }

    return {
        type: 'rewrite',
        reason: reason,
        redirectInfo: redirectInfo,
    };
}


//
// Entry Point
//
const HTML_HOST_MAP: Map<string, string[]> = new Map([
    ['whatwg.org', [
        '/html',
        '/html/',
    ]],
    ['www.whatwg.org', [
        '/specs/web-apps/current-work/',
        '/specs/web-apps/current-work/multipage/*'
    ]],
    ['developers.whatwg.org', [
        '/*',
    ]],
    ['html.spec.whatwg.org', [
        '/*',
    ]],
]);


export function rewrite(url: Url): ExtendedRedirectInfo {
    const host = url.host;
    const pathname = url.pathname;

    for (const pair of HTML_HOST_MAP) {
        const expectedHost = pair[0];
        if (expectedHost !== host) {
            continue;
        }

        for (const expectedPath of pair[1]) {
            if (expectedPath.endsWith('*')) {
                const pathPrefix = expectedPath.substring(0, expectedPath.length - 1);
                if (pathname.startsWith(pathPrefix)) {
                    return createRedirectInfo(url);
                }
            } else {
                if (expectedPath === pathname) {
                    return createRedirectInfo(url);
                }
            }
        }
    }

    return null;
}
