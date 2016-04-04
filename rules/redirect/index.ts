'use strict';
import * as urlModule from 'url';
import * as request from 'request';
import * as parse5 from 'parse5';
import { RedirectInfo, ExtendedRedirectInfo } from '../';
import { url2RedirectInfo } from '../utils';
import * as http from './http';
import * as html from './html';


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

    const httpRedirected = await http.redirect(urlString);
    if (httpRedirected) {
        return createRedirectInfo('redirect by HTTP 30x', httpRedirected, false);
    }

    const htmlRedirected = await html.redirect(urlString);
    if (htmlRedirected) {
        return createRedirectInfo('redirect by HTML meta refresh', htmlRedirected, true);
    }

    return null;
}
