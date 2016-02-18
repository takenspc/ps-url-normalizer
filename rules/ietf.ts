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

    // XXX http://www.rfc-editor.org/
    // XXX How to support redirecting
    // draft-ietf-httpbis-client-hints -> draft-ietf-httpbis-client-hints-00
    // https://www.ietf.org/id/all_id2.txt ?

    if (host === 'www.ietf.org' || host === 'tools.ietf.org') {
        const matchObject = /^\/(?:rfc|internet-drafts|id|html)\/([a-zA-Z0-9-]+)(?:\.txt)?$/.exec(pathname);

        if (matchObject) {
            return redirect(url, {
                host: 'tools.ietf.org',
                pathname: '/html/' + matchObject[1],
            });
        }
    }

    return redirect(url, {});
}
