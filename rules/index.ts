'use strict'; // XXX
import { Url, format } from 'url';
import * as rewrite from './rewrite';
import * as redirect from './redirect';
import * as wd2ed from './wd2ed';


// https://nodejs.org/api/url.html#url_url_format_urlobj
export interface RedirectInfo {
    protocol?: string
    host?: string
    pathname?: string
    search?: string
    hash?: string
}

export interface ExtendedRedirectInfo {
    type: string
    reason: string
    redirectInfo: RedirectInfo
}


export interface URLInfo {
    url: Url,
    redirects: ExtendedRedirectInfo[],
}


function handleRedirect(url: Url, extRedirectInfo: ExtendedRedirectInfo): boolean {
    const redirectInfo = extRedirectInfo.redirectInfo;

    let changed = false;
    for (const key of Object.keys(redirectInfo)) {
        if (redirectInfo[key] && redirectInfo[key] !== url[key]) {
            url[key] = redirectInfo[key];
            changed = true;
        }
    }

    return changed;
}


export async function normalize(url: Url): Promise<URLInfo> {
    // console.log(format(url));
    const redirects: ExtendedRedirectInfo[] = [];

    let outerRedirected = false;
    const redirecters = [redirect, rewrite , wd2ed, redirect];
    do {
        outerRedirected = false;
        for (const redirecter of redirecters) {
            let innerRedirected = false;
            do {
                const extRedirectInfo = await redirecter.normalize(url);
                if (extRedirectInfo) {
                    innerRedirected = handleRedirect(url, extRedirectInfo);
                    if (innerRedirected) {
                        redirects.push(extRedirectInfo);
                        outerRedirected = true;
                    }
                } else {
                    innerRedirected = false;
                }
            } while (innerRedirected);
        }
    } while (outerRedirected);

    // console.log('\t' + format(url));

    return {
        url: url,
        redirects: redirects,
    };
}
