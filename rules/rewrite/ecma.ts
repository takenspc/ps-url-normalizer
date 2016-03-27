'use strict'; // XXX
import { Url } from 'url';
import { RedirectInfo, ExtendedRedirectInfo } from '../';


//
// Entry Point
//
export function rewrite(url: Url): ExtendedRedirectInfo {
    if (url.host === 'ecma-international.org') {
        const reason = 'Prefer www.ecma-international.org over ecma-international.org';
        const redirectInfo: RedirectInfo = {
            host: 'www.ecma-international.org',
        };

        return {
            type: 'rewrite',
            reason: reason,
            redirectInfo: redirectInfo,
        };
    }

    return null;
}
