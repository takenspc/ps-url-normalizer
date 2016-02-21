'use strict'; // XXX
import { Url } from 'url';
import * as whatwg from './whatwg';
import * as ecma from './ecma';
import * as ietf from './ietf';
import * as mozilla from './mozilla';


export interface RedirectInfo {
    protocol?: string
    host?: string
    pathname?: string
    hash?: string
}

const HTTPS_HOSTS = [
    '.chromium.org',
    '.github.com',
    '.github.io',
    '.khronos.org',
    '.opus-codec.org',
    '.w3.org',
    '.xiph.org',
];


function redirect(url: Url, redirectInfo: RedirectInfo): boolean {
    let changed = false;
    const keys = ['protocol', 'host', 'pathname', 'hash'];

    for (const key of keys) {
        if (redirectInfo[key] && redirectInfo[key] !== url[key]) {
            url[key] = redirectInfo[key];
            changed = true;
        }
    }

    return changed;
}

export function normalize(url: Url): string {
    let canRedirect = true;

    while (canRedirect) {
        const hostWithDot = '.' + url.host;
        
        // XXX USE HTST lists
        for (const httpsHost of HTTPS_HOSTS) {
            if (hostWithDot.endsWith(httpsHost)) {
                const redirectInfo = { protocol: 'https:' };
                canRedirect = redirect(url, redirectInfo);
                break;
            }
        }


        const redirecters = [whatwg, ecma, ietf, mozilla];
        for (const redirecter of redirecters) {
            if (hostWithDot.endsWith(redirecter.host)) {
                const redirectInfo = redirecter.normalize(url);
                canRedirect = redirect(url, redirectInfo);
            }
        }
    }

    return `${url.protocol}//${url.host}${url.pathname}${url.hash || ''}`;
}
