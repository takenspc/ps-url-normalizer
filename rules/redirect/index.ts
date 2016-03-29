'use strict';
import * as urlModule from 'url';
import * as request from 'request';
import * as parse5 from 'parse5';
import { RedirectInfo, ExtendedRedirectInfo } from '../';
import { url2RedirectInfo } from '../utils';


//
// HTTP
//
class CacheEntry<T> {
    datetime: number
    value: T
    constructor(value: T) {
        this.datetime = Date.now();
        this.value = value;
    }
}

class Cache<T> {
    map: Map<T, CacheEntry<T>> = new Map();
    get(key: T): T {
        if (this.has(key)) {
            return this.map.get(key).value;
        }

        return null;
    }
    
    has(key: T): boolean {
        const timeout = 3600 * 1000;
        const entry = this.map.get(key);

        if (entry && (Date.now() - entry.datetime < timeout)) {
            return true;
        }
        return false;
    }
    
    set(key: T, value: T) {
        this.map.set(key, new CacheEntry<T>(value));
    }
}


//
// HTTP Redirect
//
const HTTP_REDIRECT_CACHE: Cache<string> = new Cache<string>();

function httpRedirect(urlString: string): Promise<string> {
    return new Promise((resolve, reject) => {
        if (HTTP_REDIRECT_CACHE.has(urlString)) {
            resolve(HTTP_REDIRECT_CACHE.get(urlString));
            return;
        }

        request.head({
            url: urlString 
        }, (err, response) => {
            if (err) {
                // XXX
                console.error(urlString, err);
                resolve(null);
                return;
            }

            // XXX
            if (response.request) {
                const redirectURL = response.request.uri.href;
                if (urlString !== redirectURL) {
                    HTTP_REDIRECT_CACHE.set(urlString, redirectURL);
                    resolve(redirectURL);
                    return;
                }
            }

            HTTP_REDIRECT_CACHE.set(urlString, null);
            resolve(null);
        });
    });
}


//
// HTML
//
function parseMeta(attrs: parse5.Attr[]): string {
    let redirectPath = null;
    let hasRedirect = false;
    const redirectRegExp = /^\s*\d+;\s*url=['"]?(.+?)['"]?\s*$/i;

    for (const attr of attrs) {
        const name = attr.name.toLowerCase();
        const value = attr.value.toLowerCase();
        if (name === 'http-equiv' && value === 'refresh') {
            hasRedirect = true;
        }

        if (name === 'content') {
            const matchObject = redirectRegExp.exec(value);
            if (matchObject) {
                redirectPath = matchObject[1];
            }
        }

    }

    if (hasRedirect) {
        return redirectPath;
    }

    return null;
}

const HTML_REDIRECT_CACHE: Cache<string> = new Cache<string>();

function htmlRedirect(urlString: string): Promise<string> {
    const parser = new parse5.SAXParser();
    let redirectURL = null;
    let seenBody = false;

    return new Promise((resolve, reject) => {
        if (HTML_REDIRECT_CACHE.has(urlString)) {
            resolve(HTML_REDIRECT_CACHE.get(urlString));
            return;
        }


        parser.on('startTag', (name, attrs, selfClosing) => {
            if (name === 'meta' && attrs.length > 1) {
                const redirectPath = parseMeta(attrs);
                if (redirectPath) {
                    redirectURL = urlModule.resolve(urlString, redirectPath);
                    seenBody = true;
                    parser.stop();
                }
            }
            
            if (name === 'body') {
                seenBody = true;
                parser.stop();
            }
        });

        parser.on('error', (err) => {
            console.error(urlString, 'parse error');
            reject(err);
        });

        parser.on('end', () => {
            if (!seenBody) {
                console.error(urlString, '<body> is not found in first 1024 bytes');
            }

            HTML_REDIRECT_CACHE.set(urlString, redirectURL);

            resolve(redirectURL);
        });
        
        request.get({
            url: urlString,
            headers: {
                range: 'bytes=0-2048',
            },
        }).on('error', (err) => {
            console.error(urlString, 'network error');
            reject(err);
        }).pipe(parser);
    });
}



//
// Utils
//
function createRedirectInfo(reason: string, urlString: string, includeHash: boolean): ExtendedRedirectInfo {
    const redirectInfo = url2RedirectInfo(urlString, includeHash);

    return {
        type: 'redirect',
        reason: reason,
        redirectInfo: redirectInfo,
    };
}


//
// Entry Point
//
function getURLStringWihtoutHash(url: urlModule.Url): string {
    const copied = Object.assign({}, url);
    copied.hash = null;
    return urlModule.format(copied);
}

export async function normalize(url: urlModule.Url): Promise<ExtendedRedirectInfo>  {
    const urlString = getURLStringWihtoutHash(url);

    const httpRedirected = await httpRedirect(urlString);
    if (httpRedirected) {
        return createRedirectInfo('Redirect by HTTP 30x', httpRedirected, false);
    }

    const htmlRedirected = await htmlRedirect(urlString);
    if (htmlRedirected) {
        return createRedirectInfo('Redirect by HTML meta refresh', htmlRedirected, true);
    }

    return null;
}
