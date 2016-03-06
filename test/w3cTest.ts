'use strict';
import * as assert from 'power-assert';
import * as normalizer from '../';


describe('w3c', () => {
    it('should leave search of url as it is', () => {
        const url = 'https://www.w3.org/Bugs/Public/show_bug.cgi?id=28553';
        assert(normalizer.normalize(url) === url);
    });

    it('should normalize protocol', () => {
        const url = 'http://www.w3.org/TR/CSS/';
        const actual = normalizer.normalize(url);
        const expected = 'https://www.w3.org/TR/CSS/';
        assert(actual === expected);
    });

    it('should normalize old HTML drafts', () => {
        {
            const url = 'https://www.w3.org/html/wg/drafts/html/CR/';
            const actual = normalizer.normalize(url);
            const expected = 'https://html.spec.whatwg.org/multipage/';
            assert(actual === expected);
        }

        {
            const url = 'https://www.w3.org/html/wg/drafts/html/master/browsers.html#offline';
            const actual = normalizer.normalize(url);
            const expected = 'https://html.spec.whatwg.org/multipage/browsers.html#offline';
            assert(actual === expected);
        }
    });
});
