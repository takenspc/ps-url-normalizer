'use strict'; // XXX
import { Url } from 'url';
import { RedirectInfo, ExtendedRedirectInfo } from '../';


//
// Entry Point
//
const HTTPS_HOSTS: string[] = [
    '.github.io',
    '.ietf.org',
    '.khronos.org',
    '.w3.org',
    '.whatwg.org',
    '.xiph.org',
];

export function rewrite(url: Url): ExtendedRedirectInfo {
    const hostWithDot = ('.' + url.host);
    for (const httpsHost of HTTPS_HOSTS) {
        if (hostWithDot.endsWith(httpsHost)) {
            if (url.protocol === 'http:') {
                const reason = 'prefer https: over http:';
                const redirectInfo: RedirectInfo = {
                    protocol: 'https:',
                };

                return {
                    type: 'rewrite',
                    reason: reason,
                    redirectInfo: redirectInfo,
                };
            }
        }
    }

    return null;
}
