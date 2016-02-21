'use strict';
import * as url from 'url';
import * as rules from './rules';


export function normalize(urlString: string): string {   
    return rules.normalize(url.parse(urlString));
}
