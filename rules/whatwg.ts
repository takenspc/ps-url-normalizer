'use strict'; // XXX
import * as fs from 'fs';
import * as path from 'path';
import { Url } from 'url';
import { redirect, RedirectInfo } from './';

//
// Normalize HTML Standard
//
const HTML_FRAGMENT_DATA_PATH: string = path.join(__dirname, 'fragment-links.json');
const HTML_FRAGMENT_DATA: any = JSON.parse(fs.readFileSync(HTML_FRAGMENT_DATA_PATH, 'utf-8'));
function normalizeHTML(hash: string): RedirectInfo {
    if (!hash) {
        return {
            pathname: '/multipage/',
        };
    }

    const id = hash.substring(1);
    if (HTML_FRAGMENT_DATA.hasOwnProperty(id)) {
        return {
            pathname: /multipage/ + HTML_FRAGMENT_DATA[id] + '.html',
            hash: hash,
        };
    }

    throw new Error('Unknown hash ' + hash);
}

//
// Normalize
//
export function normalize(url: Url, changed: boolean): string {
    if (url.protocol === 'http:') {
        return redirect(url, { protocol: 'https:' });
    }
    
    const htmlHostPathMap = new Map<string, string[]>([
        ['whatwg.org', [
            '/html',
            '/html/',
        ]],
        ['www.whatwg.org', [
            '/specs/web-apps/current-work/',
            '/specs/web-apps/current-work/multipage/*'
        ]],
        ['html.spec.whatwg.org', [
            '/',
        ]],
    ]);

    const host = url.host;
    const path = url.pathname;

    for (const pair of htmlHostPathMap) {
        const expectedHost = pair[0];
        if (expectedHost !== host) {
            continue;
        }

        for (const expectedPath of pair[1]) {
            if (expectedPath.endsWith('*')) {
                const pathPrefix = expectedPath.substring(0, expectedPath.length - 1);
                if (path.startsWith(pathPrefix)) {
                    return redirect(url, {
                        host: 'html.spec.whatwg.org',
                        pathname: '/multipage/',
                    });
                }
            } else {
                if (expectedPath === path) {
                    return redirect(url, {
                        host: 'html.spec.whatwg.org',
                        pathname: '/multipage/',
                    });
                }
            }
        }
    }

    if (host === 'html.spec.whatwg.org' && path.startsWith('/multipage/')) {
        const redirectInfo = normalizeHTML(url.hash);
        return redirect(url, redirectInfo)
    }

    return redirect(url, {});
}
