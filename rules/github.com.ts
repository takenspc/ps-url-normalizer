'use strict'; // XXX
import { Url } from 'url';
import { RedirectInfo } from './';

//
// TODO THIS FILE SHOULD BE REMOVED
// 
//
// Normalize
//
export const host: string = '.github.com';

export function normalize(url: Url): RedirectInfo {
    if (url.protocol === 'http:') {
        return { protocol: 'https:' };
    }

    const host = url.host;
    
    if (host === 'webaudio.github.com') {
        return {
            host: 'webaudio.github.io',
        }
    }

    const path = url.pathname;

    if (path === '/johnmccutchan/ecmascript_simd/') {
        return {
            protocol: 'https:',
            host: 'tc39.github.io',
            pathname: '/ecmascript_simd/',
        };
    }

    if (path === '/lars-t-hansen/ecmascript_sharedmem') {
        return {
            protocol: 'https:',
            host: 'tc39.github.io',
            pathname: '/ecmascript_sharedmem/shmem.html',
        }
    }

    if (path === '/slightlyoff/ServiceWorker/') {
        return {
            protocol: 'https:',
            host: 'slightlyoff.github.ioo',
            pathname: '/ServiceWorker/spec/service_worker/',
        }
    }

    if (path === '/WebAssembly/spec') {
        return {
            protocol: 'https:',
            host: 'webassembly.github.io',
            pathname: '/',
        }
    }

    return {};
}