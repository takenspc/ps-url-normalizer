'use strict'; // XXX
import { Url } from 'url';
import { RedirectInfo } from './';


export const host: string = '.mozilla.org';

export function normalize(url: Url): RedirectInfo {
    const host = url.host;
    const pathname = url.pathname;

    // https://people.mozilla.org/~jorendorff/es6-draft.html
    if (host === 'people.mozilla.org') {
        if (pathname === '/~jorendorff/es6-draft.html') {
            return {
                protocol: 'http:',
                host: 'www.ecma-international.org',
                pathname: '/ecma-262/6.0/',
            };
        }
    }

    return {};
}
