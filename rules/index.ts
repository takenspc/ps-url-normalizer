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
    to?: string
    redirectInfo: RedirectInfo
}


export interface URLInfo {
    url: string,
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
    const originalURLString = format(url);
    const redirects: ExtendedRedirectInfo[] = [];

    let outerRedirected = false;
    let count = 0;
    const redirecters = [rewrite , wd2ed, redirect];

    do {
        outerRedirected = false;
        for (const redirecter of redirecters) {
            let innerRedirected = false;
            do {
                const extRedirectInfo = await redirecter.normalize(url);
                // if a redirecter doesn't redirect the url, exit inner loop
                if (!extRedirectInfo) {
                    break;
                }

                innerRedirected = handleRedirect(url, extRedirectInfo);
                if (innerRedirected) {
                    extRedirectInfo.to = format(url);
                    redirects.push(extRedirectInfo);
                    // if a redirecter redirects the url, run other redirecters (outer loop)
                    outerRedirected = true;
                }

                // avoid inifenite loop
                count++;
                if (count > 10) {
                    console.error(originalURLString, count);
                    break;
                }
            } while (innerRedirected);

            // avoid inifenite loop
            if (count > 10) {
                break;
            }
        }
    } while (outerRedirected);

    return {
        url: format(url),
        redirects: redirects,
    };
}
