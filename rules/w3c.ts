'use strict'; // XXX
import { Url } from 'url';
import { RedirectInfo } from './';


//
// dev.w3.org
//
function normalizeDevW3Org(url: Url): RedirectInfo {
    const path = url.pathname;
    const redirectMap = new Map<string, string>([
        ['/csswg/', 'drafts.csswg.org'],
        ['/fxtf/', 'drafts.fxtf.org'],
        ['/houdini/', 'drafts.css-houdini.org'],
    ]);

    for (const pair of redirectMap) {
        if (path.startsWith(pair[0])) {
            const component = path.split('/');
            component.shift();
            return {
                protocol: 'https:',
                host: pair[1],
                pathname: component.join('/'),
            };
        }
    }

    const githubMap = new Map<string, string>([
        ['/2006/webapi/clipops/clipops.html', '/clipboard-apis/'],
        ['/2006/webapi/FileAPI/', '/FileAPI/'],
        ['/2009/dap/vibration/', '/vibration/'],
        ['/2011/webrtc/editor/webrtc.html', '/webrtc-pc/'],
        ['/2011/webrtc/editor/getusermedia.html', '/mediacapture-main/getusermedia.html'],
        ['/html5/webvtt/', '/webvtt/'],
        ['/html5/websockets/', '/websockets/'],
        ['/geo/api/spec-source-orientation.html', '/deviceorientation/spec-source-orientation.html'],
    ]);

    for (const pair of githubMap) {
        if (path === pair[0]) {
            return {
                protocol: 'https:',
                host: 'w3c.github.io',
                pathname: pair[1],
            }
        }
    }

    if (path === '/webfonts/WOFF2/spec/') {
        return {
            protocol: 'https:',
            host: 'www.w3.org',
            pathname: '/TR/WOFF2/'
        }
    }

    return {};
}


//
// dvcs.w3.org
//
function normalizeDvcsW3Org(url: Url): RedirectInfo {
    const path = url.pathname;

    const githubMap = new Map<string, string>([
        ['/hg/audio/raw-file/tip/webaudio/specification.html', '/web-audio-api/'],
        ['/hg/content-security-policy/raw-file/tip/csp-specification.dev.html', '/webappsec-csp/'],
        ['/hg/dap/raw-file/default/light/Overview.html', '/ambient-light/'],
        ['/hg/dom3events/raw-file/tip/html/DOM3-Events.html', '/uievents/'],
        ['/hg/gamepad/raw-file/default/gamepad.html', '/gamepad/'],
        ['/hg/html-media/raw-file/tip/media-source/media-source.html', '/media-source/'],
        ['/hg/ime-api/raw-file/default/Overview.html', '/ime-api/'],
        ['/hg/IndexedDB/raw-file/tip/Overview.html', '/IndexedDB/'],
        ['/hg/pointerevents/raw-file/tip/pointerEvents.html', '/pointerevents/'],
        ['/hg/pointerlock/raw-file/default/index.html', '/pointerlock/'],
        ['/hg/screen-orientation/raw-file/tip/Overview.html', '/screen-orientation/'],
        ['/hg/webcomponents/raw-file/tip/spec/imports/index.html', '/webcomponents/spec/imports/'],
        ['/hg/webcomponents/raw-file/tip/spec/shadow/index.html', '/webcomponents/spec/shadow/'],
        ['/hg/webperf/raw-file/default/specs/RequestAnimationFrame/Overview.html', '/animation-timing/'],
        ['/hg/webperf/raw-file/tip/specs/Beacon/Overview.html', '/beacon/'],
        ['/hg/webperf/raw-file/tip/specs/HighResolutionTime/Overview.html', '/hr-time/'],
        ['/hg/webperf/raw-file/tip/specs/NavigationTiming/Overview.html', '/navigation-timing/'],
        ['/hg/webperf/raw-file/tip/specs/PageVisibility/Overview.html', '/page-visibility/'],
        ['/hg/webperf/raw-file/tip/specs/UserTiming/Overview.html', '/user-timing/'],
    ]);

    for (const pair of githubMap) {
        if (path === pair[0]) {
            return {
                protocol: 'https:',
                host: 'w3c.github.io',
                pathname: pair[1],
            }
        }
    }


    const redirectMap = new Map<string, RedirectInfo>([
        ['/hg/FXTF/raw-file/tip/filters/Overview.html', {
            protocol: 'https:',
            host: 'drafts.fxtf.org',
            pathname: '/filters/'
        }],
        ['/hg/fullscreen/raw-file/tip/Overview.htm;', {
            protocol: 'https:',
            host: 'fullscreen.spec.whatwg.org',
            pathname: '/'
        }],
        ['/hg/domcore/raw-file/tip/Overview.html', {
            protocol: 'https:',
            host: 'dom.spec.whatwg.org',
            pathname: '/'
        }],
        // In fact, this is not redirected
        ['/hg/xhr/raw-file/tip/Overview.html', {
            protocol: 'https:',
            host: 'xhr.spec.whatwg.org',
            pathname: '/'
        }],
    ]);

    for (const pair of redirectMap) {
        if (path.startsWith(pair[0])) {
            return pair[1];
        }
    }

    return {};
}

//
// Normalize
//
export const host: string = '.w3.org';

export function normalize(url: Url): RedirectInfo {
    if (url.protocol === 'http:') {
        return { protocol: 'https:' };
    }

    const host = url.host;

    if (host === 'dev.w3.org') {
        return normalizeDevW3Org(url);
    }

    if (host === 'dvcs.w3.org') {
        return normalizeDevW3Org(url);
    }


    return {};
}