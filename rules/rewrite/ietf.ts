'use strict'; // XXX
import { Url } from 'url';
import { RedirectInfo, ExtendedRedirectInfo } from '../';


//
// tools.ietf.org
//
function createRedirectInfo(pathname: string): ExtendedRedirectInfo {
    const reason = 'Prefer html viewer (tools.ietf.org)';
    const redirectInfo: RedirectInfo = {
        host: 'tools.ietf.org',
        pathname: '/html/' + pathname,
    };

    return {
        type: 'rewrite',
        reason: reason,
        redirectInfo: redirectInfo,
    };
}

function rewriteIETF(url: Url): ExtendedRedirectInfo {
    const host = url.host;
    const pathname = url.pathname;

    // XXX http://www.rfc-editor.org/
    // XXX How to support redirecting
    // draft-ietf-httpbis-client-hints -> draft-ietf-httpbis-client-hints-00
    // https://www.ietf.org/id/all_id2.txt ?

    if (host === 'www.ietf.org' || host === 'tools.ietf.org') {
        const pattern = /^\/(?:rfc|internet-drafts|id|html)\/([a-zA-Z0-9-]+)(?:\.txt)?$/;
        const matchObject = pattern.exec(pathname);

        if (matchObject) {
            return createRedirectInfo(matchObject[1]);
        }
    }

    if (host === 'datatracker.ietf.org') {
        const pattern = /^\/doc\/([a-zA-Z0-9-]+)\/?$/;
        const matchObject = pattern.exec(pathname);

        if (matchObject) {
            return createRedirectInfo(matchObject[1]);
        }
    }

    return null;
}


//
// Entry Point
//
export function rewrite(url: Url): ExtendedRedirectInfo {

    return rewriteIETF(url);
}
