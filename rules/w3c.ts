'use strict'; // XXX
import { Url } from 'url';
import { RedirectInfo } from './';


//
// Normalize
//
export const host: string = '.w3.org';

export function normalize(url: Url): RedirectInfo {
    if (url.protocol === 'http:') {
        return { protocol: 'https:' };
    }

    return {};
}