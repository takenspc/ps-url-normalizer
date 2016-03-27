'use strict';
import * as urlModule from 'url';
import * as request from 'request';
import * as parse5 from 'parse5';
import { RedirectInfo, ExtendedRedirectInfo } from '../';
import { url2RedirectInfo } from '../utils';


//
// HTTP
//
function httpRedirect(urlString: string): Promise<string> {
    return new Promise((resolve, reject) => {
        request.head(urlString, (err, response) => {
            if (err) {
                // XXX
                console.error(urlString, err);
                resolve(null);
                return;
            }

            // XXX
            if (response.request) {
                resolve(response.request.uri.href);
                return;
            }

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
    const redirectRegExp = /^\s*\d+;\s*url=['"]?(.+*)['"]?/;

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

function htmlRedirect(urlString: string): Promise<string> {
    const parser = new parse5.SAXParser();
    let redirectURL = null;
    let seenBody = false;

    return new Promise((resolve, reject) => {
        parser.on('startTag', (name, attrs, selfClosing) => {
            if (name === 'meta' && attrs.length > 1) {
                const redirectPath = parseMeta(attrs);
                if (redirectPath) {
                    redirectURL = urlModule.resolve(urlString, redirectPath);
                    parser.stop();
                }
            }
            
            if (name === 'body') {
                seenBody = true;
                parser.stop();
            }
        });

        parser.on('error', (err) => {
            reject(err);
        });

        parser.on('end', () => {
            if (!seenBody) {
                console.error(urlString, '<body> is not found in first 1024 bytes')
            }

            resolve(redirectURL);
        });
        
        request.get({
            url: urlString,
            headers: {
                Range: 'bytes=0-1024',
            },
        }).on('error', (err) => {
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
export async function normalize(url: urlModule.Url): Promise<ExtendedRedirectInfo>  {
    const urlString = urlModule.format(url);

    // TODO add support cache
    const httpRedirected = await httpRedirect(urlString);
    if (httpRedirected) {
        return createRedirectInfo('Redirect by HTTP 30x', httpRedirected, false);
    }
    
    // TODO add support cache
    const htmlRedirected = await htmlRedirect(urlString);
    if (htmlRedirected) {
        return createRedirectInfo('Redirect by HTML meta refresh', htmlRedirected, true);
    }

    return null;
}
