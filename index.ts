'use strict';
import * as url from 'url';
import * as rules from './rules';


export async function normalize(urlString: string): Promise<string> {
    const urlObj = url.parse(urlString);
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
        return Promise.resolve(urlString);
    }

    const urlInfo = await rules.normalize(urlObj);
    const newURLString = url.format(urlInfo.url);
    return newURLString;
}
