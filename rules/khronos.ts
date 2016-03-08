'use strict'; // XXX
import { Url } from 'url';
import { RedirectInfo } from './';


export const host: string = '.www.khronos.org';

export function normalize(url: Url): RedirectInfo {
    if (url.protocol === 'http:') {
        return { protocol: 'https:' };
    }

    const host = url.host;
    const pathname = url.pathname;

    if (host === 'www.khronos.org') {
        // https://www.khronos.org/registry/typedarray/specs/latest/
        // http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
        if (pathname === '/registry/typedarray/specs/latest/') {
            return {
                protocol: 'http:',
                host: 'www.ecma-international.org',
                pathname: '/ecma-262/6.0/',
                hash: '#sec-typedarray-objects'
            };
        }
        
        
        // https://www.khronos.org/registry/webgl/specs/latest/
        // https://www.khronos.org/registry/webgl/specs/1.0/
        if (pathname === '/registry/webgl/specs/latest/' || 
            pathname === '/registry/webgl/specs/1.0/') {
            return {
                pathname: '/registry/webgl/specs/latest/1.0/',
            };
        }

        // https://www.khronos.org/registry/webgl/specs/2.0/
        if (pathname === '/registry/webgl/specs/2.0/') {
            return {
                pathname: '/registry/webgl/specs/latest/2.0/',
            };
        }
    }

    return {};
}
