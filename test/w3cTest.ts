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
});
