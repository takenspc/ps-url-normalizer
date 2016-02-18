'use strict'; // XXX
import { Url } from 'url';
import * as whatwg from './whatwg';

export interface RedirectInfo {
    protocol?: string
    host?: string
    pathname?: string
    hash?: string
}

export function redirect(url: Url, redirectInfo: RedirectInfo): string {
    let changed = false;
    const keys = ['protocol', 'host', 'pathname', 'hash'];
    
    for (const key of keys) {
        if (redirectInfo[key] && redirectInfo[key] !== url[key]) {
            url[key] = redirectInfo[key];
            changed = true;
        }
    }
    
    return normalize(url, changed);
}

export function normalize(url: Url, changed: boolean): string {
    const protocol = url.protocol;
    const host = url.host;
    const pathname = url.pathname;
    const hash = url.hash || '';

    if (changed) {
        if (('.' + host).endsWith('.whatwg.org')) {
            return whatwg.normalize(url, changed);
        }
    }

    return `${protocol}//${host}${pathname}${hash}`;
}


