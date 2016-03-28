'use strict'; // XXX
import { Url } from 'url';
import { RedirectInfo, ExtendedRedirectInfo } from '../';


//
// Entry Point
//
export function rewrite(url: Url): ExtendedRedirectInfo {
    const host = '.w3.org';

    if (('.' + url.host).endsWith(host)) {
        if (url.protocol === 'http:') {
            const reason = 'Prefer https: over http:';
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

    return null;
}
