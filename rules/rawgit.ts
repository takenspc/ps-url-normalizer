'use strict'; // XXX
import { Url } from 'url';
import { RedirectInfo } from './';

//
// TODO THIS FILE SHOULD BE REMOVED
// 
//
// Normalize
//
export const host: string = '.rawgit.com';

export function normalize(url: Url): RedirectInfo {
    if (url.protocol === 'http:') {
        return { protocol: 'https:' };
    }

    const path = url.pathname;

    if (path === '/w3c/touch-events/master/touchevents.html') {
        return {
            protocol: 'https:',
            host: 'w3c.github.io',
            pathname: '/touch-events/',
        };
    }

    // TODO
    if (path === '/slightlyoff/IntersectionObserver/master/index.html') {
        return {
            protocol: 'https:',
            host: 'github.com',
            pathname: '/WICG/IntersectionObserver',
        }
    }


    return {};
}