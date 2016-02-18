'use strict'; // XXX
import { Url } from 'url';
import { redirect } from './';


export const hosts: string[] = ['.ecma-international.org', 'people.mozilla.org'];

export function normalize(url: Url, changed: boolean): string {
    const host = url.host;
    const pathname = url.pathname;

    if (host === 'people.mozilla.org') {
        if (pathname === '/~jorendorff/es6-draft.html') {
            return redirect(url, {
                protocol: 'http:',
                host: 'www.ecma-international.org',
                pathname: '/ecma-262/6.0/',
            });
        }
    }

    if (host === 'ecma-international.org') {
        return redirect(url, {
            protocol: 'http:',
            host: 'www.ecma-international.org'
        });
    }

    if (host === 'www.ecma-international.org') {
        // ECMA 262 - ECMAScript Language Specification
        if (pathname === '/ecma-262/5.1/index.html') {
            return redirect(url, {
                pathname: '/ecma-262/5.1/',
            });
        }

        if (pathname === '/ecma-262/6.0/index.html') {
            return redirect(url, {
                pathname: '/ecma-262/6.0/',
            });
        }

        // ECMA 402 - ECMAScript Internationalization API Specification
        if (pathname === '/ecma-402/1.0/index.html') {
            return redirect(url, {
                pathname: '/ecma-402/1.0/',
            });
        }
    }

    return redirect(url, {});
}
