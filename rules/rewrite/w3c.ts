'use strict'; // XXX
import { Url } from 'url';
import { RedirectInfo, ExtendedRedirectInfo } from '../';


//
// dev.w3.org
//
const REDIRECT_MAP: Map<string, string> = new Map([
    ['/csswg/', 'drafts.csswg.org'],
    ['/fxtf/', 'drafts.fxtf.org'],
    ['/houdini/', 'drafts.css-houdini.org'],
]);

function rewriteDevW3Org(url: Url): ExtendedRedirectInfo {
    const pathname = url.pathname;

    for (const pair of REDIRECT_MAP) {
        const knownPathname = pair[0];
        const newHost = pair[1];

        if (pathname.startsWith(knownPathname)) {
            const newPathname = pathname.substring(knownPathname.length - 1);

            const reason = 'dev.w3.org' + knownPathname + ' now redirects ' + newHost;
            const redirectInfo: RedirectInfo = {
                protocol: 'https:',
                host: newHost,
                pathname: newPathname,
            }

            return {
                type: 'rewrite',
                reason: reason,
                redirectInfo: redirectInfo,
            };
        }
    }

    return null;
}


//
// Entry Point
//
export function rewrite(url: Url): ExtendedRedirectInfo {

    if (url.host  === 'dev.w3.org') {
        return rewriteDevW3Org(url);
    }

    return null;
}
