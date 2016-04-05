'use strict';
import * as url from 'url';
import * as rules from './rules';
import * as updater from './updater';


export function update(): Promise<any> {
    return updater.update();
}


export function normalizeWithRedirectInfo(urlString: string): Promise<rules.URLInfo> {
    const urlObj = url.parse(urlString);
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
        const urlInfo: rules.URLInfo = {
            url: urlString,
            redirects: [],
        };

        return Promise.resolve(urlInfo);
    }

    return rules.normalize(urlObj);
}

export function normalize(urlString: string): Promise<string> {
    return normalizeWithRedirectInfo(urlString).then((urlInfo) => {
        return urlInfo.url;
    });
}
