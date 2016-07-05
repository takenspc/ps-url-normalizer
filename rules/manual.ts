import { Url, parse } from 'url';
import { RedirectInfo, ExtendedRedirectInfo } from './';
import { url2RedirectInfo } from './utils';


export interface ManualRedirectEntry {
    from: string
    to: string
    reason: string
    enabled: boolean
}

function isSameURL(url: Url, urlString: string): boolean {
    const redirectInfo = url2RedirectInfo(urlString, false);
    for (const key of Object.keys(redirectInfo)) {
        if (url[key] !== redirectInfo[key]) {
            return false;
        }
    }

    return true;
}

function createRedirectInfo(type: string, reason: string, urlString: string, includeHash: boolean): ExtendedRedirectInfo {
    const redirectInfo = url2RedirectInfo(urlString, includeHash);
    
    return {
        type: type,
        reason: reason,
        redirectInfo: redirectInfo,
    };
}


//
// Entry Point
//
export function manualRedirect(url: Url, rawData: ManualRedirectEntry[], type: string, includeHash: boolean): ExtendedRedirectInfo {
    for (const entry of rawData) {
        if (!entry.enabled) {
            continue;
        }

        if (isSameURL(url, entry.from)) {
            return createRedirectInfo(type, entry.reason, entry.to, includeHash);
        }
    }

    return null;
}

