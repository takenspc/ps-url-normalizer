'use strict'; // XXX
import { Url } from 'url';
import { RedirectInfo } from './';

//
// TODO THIS FILE SHOULD BE REMOVED
// 
//
// Normalize
//
export const host: string = '.www.w3c-test.org';

export function normalize(url: Url): RedirectInfo {
    const path = url.pathname;
    if (path === '/webperf/specs/ResourceTiming/') {
        return {
            protocol: 'https:',
            host: 'w3c.github.io',
            pathname: '/resource-timing/',
        };
    }

    return {};
}
