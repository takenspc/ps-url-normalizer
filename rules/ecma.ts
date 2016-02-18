'use strict'; // XXX
import { Url } from 'url';
import { redirect } from './';


export function normalize(url: Url, changed: boolean): string {
    const host = url.host;
    const path = url.pathname;

    if (host === 'ecma-international.org') {
        return redirect(url, {
            protocol: 'http:',
            host: 'www.ecma-international.org'
        });
    }
    
    if (host === 'www.ecma-international.org') {
        // ECMA 262 - ECMAScript Language Specification
        if (path === '/ecma-262/5.1/index.html') {
            return redirect(url, {
                pathname: '/ecma-262/5.1/',
            });
        }

        if (path === '/ecma-262/6.0/index.html') {
            return redirect(url, {
                pathname: '/ecma-262/6.0/',
            });
        }

        // ECMA 402 - ECMAScript Internationalization API Specification
        if (path === '/ecma-402/1.0/index.html') {
            return redirect(url, {
                pathname: '/ecma-402/1.0/',
            });
        }
    }

    return redirect(url, {});
}
