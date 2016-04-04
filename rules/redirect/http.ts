'use strict';
import * as urlModule from 'url';
import * as request from 'request';
import { Cache } from './cache';


//
// HTTP Redirect
//
const HTTP_REDIRECT_CACHE: Cache<string> = new Cache<string>();

export function redirect(urlString: string): Promise<string> {
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
                const redirectURL = urlModule.format(response.request.uri);
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
