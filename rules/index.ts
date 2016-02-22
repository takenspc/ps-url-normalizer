'use strict'; // XXX
import { Url, format } from 'url';
import * as ecma from './ecma';
import * as ietf from './ietf';
import * as mozilla from './mozilla';
import * as w3c from './w3c';
import * as whatwg from './whatwg';


// https://nodejs.org/api/url.html#url_url_format_urlobj
export interface RedirectInfo {
    protocol?: string
    host?: string
    pathname?: string
    search?: string
    hash?: string
}

const HTTPS_HOSTS = [
    '.chromium.org',
    '.github.com',
    '.github.io',
    '.khronos.org',
    '.opus-codec.org',
    '.xiph.org',
];


function redirect(url: Url, redirectInfo: RedirectInfo): boolean {
    let changed = false;
    const keys = ['protocol', 'host', 'pathname', 'search', 'hash'];

    for (const key of keys) {
        if (redirectInfo[key] && redirectInfo[key] !== url[key]) {
            url[key] = redirectInfo[key];
            changed = true;
        }
    }

    return changed;
}

export function normalize(url: Url): string {
    let canRedirect = false;
    do {
        canRedirect = false;
        const hostWithDot = '.' + url.host;
        
        // XXX USE HTST lists
        for (const httpsHost of HTTPS_HOSTS) {
            if (hostWithDot.endsWith(httpsHost)) {
                const redirectInfo = { protocol: 'https:' };
                canRedirect = redirect(url, redirectInfo);
                break;
            }
        }


        const redirecters = [ecma, ietf, mozilla, w3c, whatwg];
        for (const redirecter of redirecters) {
            if (hostWithDot.endsWith(redirecter.host)) {
                const redirectInfo = redirecter.normalize(url);
                canRedirect = redirect(url, redirectInfo);
            }
        }
    } while (canRedirect);

    return format(url);
}
