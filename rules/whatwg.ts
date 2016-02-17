'use strict'; // XXX
import * as fs from 'fs';
import * as path from 'path';
import { Url } from 'url';

//
// Protocol
//
function normalieProtocol(protocol: string): string {
    // whatwg.org use 'https:'
    return 'https:';
}


//
// Normalize HTML Standard
//
const HTML_FRAGMENT_DATA_PATH: string = path.join(__dirname, 'fragment-links.json');
const HTML_FRAGMENT_DATA: any = JSON.parse(fs.readFileSync(HTML_FRAGMENT_DATA_PATH, 'utf-8'));
function normalizeHTMLFragment(fragment: string): string {
    if (!fragment) {
        return '';
    }

    const index = fragment.substring(1);
    if (HTML_FRAGMENT_DATA.hasOwnProperty(index)) {
        return HTML_FRAGMENT_DATA[index] + '.html' + fragment;
    }

    throw new Error('Unknown fragment ' + fragment);
}

function normalizeHTML(fragment: string): string {
    return 'html.spec.whatwg.org/multipage/' + normalizeHTMLFragment(fragment);
}


//
// Normalize
//
function redirect(url: Url, host: string, pathname: string): string {
    url.host = host;
    url.pathname = pathname;
    return normalizeHostAndPath(url);
}

function normalizeHostAndPath(url: Url): string {
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
                    return redirect(url, 'html.spec.whatwg.org', '/multipage/');
                }
            } else {
                if (expectedPath === path) {
                    return redirect(url, 'html.spec.whatwg.org', '/multipage/');
                }
            }
        }
    }

    // url.hash can be `null`
    const fragment = url.hash || '';
    if (host === 'html.spec.whatwg.org' && path.startsWith('/multipage/')) {
        return normalizeHTML(fragment);
    }

    return host + path + fragment;
}


//
// Entry point
//
export function normalize(url: Url): string {

    const protocol = normalieProtocol(url.protocol);
    const hostAndPath = normalizeHostAndPath(url);

    return `${protocol}//${hostAndPath}`;
}
