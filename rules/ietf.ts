'use strict'; // XXX
import { Url } from 'url';
import { redirect } from './';


export const hosts: string[] = ['.ietf.org'];

export function normalize(url: Url, changed: boolean): string {
    if (url.protocol === 'http:') {
        return redirect(url, { protocol: 'https:' });
    }

    const host = url.host;
    const pathname = url.pathname;

    if (host === 'www.ietf.org' || host === 'tools.ietf.org') {
        const matchObject = /^\/(?:rfc|id|html)\/([a-zA-Z0-9-]+)(?:\.txt)?$/.exec(pathname);

        if (matchObject) {
            return redirect(url, {
                host: 'tools.ietf.org',
                pathname: '/html/' + matchObject[1],
            });
        }
    }

    return redirect(url, {});
}
