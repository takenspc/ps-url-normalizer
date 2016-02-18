'use strict';
import * as assert from 'power-assert';
import * as url from 'url';
import * as whatwg from '../rules/whatwg';

//
describe('whatwg', () => {
    it('should normalize protocol', () => {
        const httpURL = 'http://dom.spec.whatwg.org/';
        const actual = whatwg.normalize(url.parse(httpURL));
        const expected = 'https://dom.spec.whatwg.org/';
        assert(actual === expected);
    });

    it('should normalize urls of html standard', () => {
        const oldURLs = [
            'http://whatwg.org/html/#applicationcache',
            'http://whatwg.org/html#2dcontext',
	       'http://www.whatwg.org/specs/web-apps/current-work/#attr-fe-minlength',
            'http://www.whatwg.org/specs/web-apps/current-work/multipage/association-of-controls-and-forms.html#constraints',
	       'https://html.spec.whatwg.org/#imagebitmapfactories',
        ];
        
        const normalizedURLs = [
            'https://html.spec.whatwg.org/multipage/browsers.html#applicationcache',
            'https://html.spec.whatwg.org/multipage/scripting.html#2dcontext',
            'https://html.spec.whatwg.org/multipage/forms.html#attr-fe-minlength',
            'https://html.spec.whatwg.org/multipage/forms.html#constraints',
            'https://html.spec.whatwg.org/multipage/webappapis.html#imagebitmapfactories',
        ];

        for (let i = 0; i < oldURLs.length; i++) {
            const actual = whatwg.normalize(url.parse(oldURLs[i]));
            const expected = normalizedURLs[i];
            assert(actual === expected);
        }
    });
});

