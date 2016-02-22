'use strict';
import * as url from 'url';
import * as rules from './rules';


export function normalize(urlString: string): string {
    const urlObj = url.parse(urlString);
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
        return urlString;
    }

    return rules.normalize(urlObj);
}
