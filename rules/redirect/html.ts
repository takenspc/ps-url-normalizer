'use strict';
import * as urlModule from 'url';
import * as request from 'request';
import * as parse5 from 'parse5';
import { Cache } from './cache';


//
// HTML meta refresh
//
const HTML_REDIRECT_CACHE: Cache<string> = new Cache<string>();
const REFRESH_REGEXP = /^\s*\d+;\s*url=['"]?(.+?)['"]?\s*$/i;

function parseMeta(attrs: parse5.Attr[]): string {
    let redirectPath = null;
    let hasRedirect = false;

    for (const attr of attrs) {
        const name = attr.name.toLowerCase();
        const value = attr.value.toLowerCase();
        if (name === 'http-equiv' && value === 'refresh') {
            hasRedirect = true;
        }

        if (name === 'content') {
            const matchObject = REFRESH_REGEXP.exec(value);
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


export function redirect(urlString: string): Promise<string> {
    const parser = new parse5.SAXParser();
    let redirectURL = null;

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
                    parser.stop();
                }
            }
            
            if (name === 'body') {
                parser.stop();
            }
        });

        parser.on('error', (err) => {
            console.error(urlString, 'parse error');
            reject(err);
        });

        parser.on('end', () => {
            HTML_REDIRECT_CACHE.set(urlString, redirectURL);

            resolve(redirectURL);
        });
        
        request.get({
            url: urlString,
            headers: {
                range: 'bytes=0-1024',
            },
        }).on('error', (err) => {
            console.error(urlString, 'network error');
            reject(err);
        }).pipe(parser);
    });
}

