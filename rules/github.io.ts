'use strict'; // XXX
import { Url } from 'url';
import { RedirectInfo } from './';


export const host: string = '.github.io';

export function normalize(url: Url): RedirectInfo {
    if (url.protocol === 'http:') {
        return { protocol: 'https:' };
    }

    const host = url.host;
    const pathname = url.pathname;

    const defaultIndex = /^(.+?\/)index.html$/;
    const matchObject = defaultIndex.exec(pathname);
    if (matchObject) {
        return {
            pathname: matchObject[1],
        };
    }

    const singleDirectory = /^\/[^/]+$/;
    if (singleDirectory.test(pathname)) {
        return {
            pathname: pathname + '/',
        };
    }


    return {};
}
