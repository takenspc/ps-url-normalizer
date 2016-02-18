'use strict';
import * as assert from 'power-assert';
import * as url from 'url';
import * as ecma from '../rules/ecma';

//
describe('ecma', () => {
    it('should normalize urls of ECMA-262 5.1', () => {
        const oldURLs = [
            'http://ecma-international.org/ecma-262/5.1/index.html',
            'http://ecma-international.org/ecma-262/5.1/',
            'http://www.ecma-international.org/ecma-262/5.1/index.html',
            'http://www.ecma-international.org/ecma-262/5.1/',
        ];
        
        const expected = 'http://www.ecma-international.org/ecma-262/5.1/';

        for (let i = 0; i < oldURLs.length; i++) {
            const actual = ecma.normalize(url.parse(oldURLs[i]), true);
            assert(actual === expected);
        }
    });

    it('should normalize urls of ECMA-262 6.0', () => {
        const oldURLs = [
            'http://ecma-international.org/ecma-262/6.0/index.html',
            'http://ecma-international.org/ecma-262/6.0/',
            'http://www.ecma-international.org/ecma-262/6.0/index.html',
            'http://www.ecma-international.org/ecma-262/6.0/',

        ];
        
        const expected = 'http://www.ecma-international.org/ecma-262/6.0/';

        for (let i = 0; i < oldURLs.length; i++) {
            const actual = ecma.normalize(url.parse(oldURLs[i]), true);
            assert(actual === expected);
        }
    });
});

