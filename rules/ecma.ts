'use strict'; // XXX
import { Url } from 'url';
import { RedirectInfo } from './';


export const host: string = '.ecma-international.org';

export function normalize(url: Url): RedirectInfo {
    const host = url.host;
    const pathname = url.pathname;

    // XXX https://es5.github.io/
    // XXX https://tc39.github.io/ecma262/
    // XXX https://tc39.github.io/ecma402/

    if (host === 'ecma-international.org') {
        return {
            protocol: 'http:',
            host: 'www.ecma-international.org'
        };
    }

    if (host === 'www.ecma-international.org') {
        // ECMA 262 - ECMAScript Language Specification
        if (pathname === '/ecma-262/5.1/index.html') {
            return {
                protocol: 'http:',
                pathname: '/ecma-262/5.1/',
            };
        }

        if (pathname === '/ecma-262/6.0/index.html') {
            return {
                protocol: 'http:',
                pathname: '/ecma-262/6.0/',
            };
        }

        // ECMA 402 - ECMAScript Internationalization API Specification
        if (pathname.startsWith('/ecma-402/')) {
            return {
                protocol: 'http:',
                pathname: '/publications/standards/Ecma-402.htm',
            };
        }
    }

    return {};
}
