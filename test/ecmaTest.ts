'use strict';
import * as assert from 'power-assert';
import * as normalizer from '../';

//
describe('ecma', () => {
    it('should normalize urls of ECMA-262 5.1', () => {
        const urls = [
            'http://ecma-international.org/ecma-262/5.1/index.html',
            'http://ecma-international.org/ecma-262/5.1/',
            'http://www.ecma-international.org/ecma-262/5.1/index.html',
            'http://www.ecma-international.org/ecma-262/5.1/',
        ];

        const expected = 'http://www.ecma-international.org/ecma-262/5.1/';

        for (let i = 0; i < urls.length; i++) {
            const actual = normalizer.normalize(urls[i]);
            assert(actual === expected);
        }
    });

    it('should normalize urls of ECMA-262 6.0 draft', () => {
        const urls = [
            'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-promise-objects',
            'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-promise-objects',
        ];

        const expected = 'http://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects';

        for (let i = 0; i < urls.length; i++) {
            const actual = normalizer.normalize(urls[i]);
            assert(actual === expected);
        }
    });

    it('should normalize urls of ECMA-262 6.0', () => {
        const urls = [
            'http://ecma-international.org/ecma-262/6.0/index.html',
            'http://ecma-international.org/ecma-262/6.0/',
            'http://www.ecma-international.org/ecma-262/6.0/index.html',
            'http://www.ecma-international.org/ecma-262/6.0/',

        ];

        const expected = 'http://www.ecma-international.org/ecma-262/6.0/';

        for (let i = 0; i < urls.length; i++) {
            const actual = normalizer.normalize(urls[i]);
            assert(actual === expected);
        }
    });

    it('should normalize urls of ECMA-402', () => {
        const urls = [
            'http://www.ecma-international.org/ecma-402/1.0/',
            'http://www.ecma-international.org/ecma-402/1.0/index.html',
            'http://www.ecma-international.org/ecma-402/2.0/',
            'http://www.ecma-international.org/ecma-402/2.0/index.html',

        ];

        const expected = 'http://www.ecma-international.org/publications/standards/Ecma-402.htm';

        for (let i = 0; i < urls.length; i++) {
            const actual = normalizer.normalize(urls[i]);
            assert(actual === expected);
        }
    });
});
