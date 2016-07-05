import { parse } from 'url';
import { RedirectInfo } from './';


export function url2RedirectInfo(urlString: string, includeHash: boolean): RedirectInfo {
    const urlObject = parse(urlString);
    const redirectInfo: RedirectInfo = {
        protocol: urlObject.protocol,
        host: urlObject.host,
        pathname: urlObject.pathname,
        search: urlObject.search,
    };
    
    if (includeHash && urlObject.hash) {
        redirectInfo.hash = urlObject.hash;
    }
    
    return redirectInfo;
}
