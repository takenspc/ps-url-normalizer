'use strict';
import * as assert from 'power-assert';
import * as normalizer from '../';

//
describe('khronos', () => {
    it('should normalize protocol', () => {
        const httpURL = 'http://www.khronos.org/registry/webgl/specs/latest/1.0/';
        const actual = normalizer.normalize(httpURL);
        const expected = 'https://www.khronos.org/registry/webgl/specs/latest/1.0/';
        assert(actual === expected);
    });

    it('should normalize urls of WebGL 1', () => {
        const oldURLs = [
            'https://www.khronos.org/registry/webgl/specs/latest/',
            'https://www.khronos.org/registry/webgl/specs/1.0/',
        ];

        const normalizedURL = 'https://www.khronos.org/registry/webgl/specs/latest/1.0/';

        for (let i = 0; i < oldURLs.length; i++) {
            const actual = normalizer.normalize(oldURLs[i]);
            assert(actual === normalizedURL);
        }
    });

    it('should normalize urls of WebGL 2', () => {
        const oldURLs = [
            'https://www.khronos.org/registry/webgl/specs/2.0/',
        ];

        const normalizedURL = 'https://www.khronos.org/registry/webgl/specs/latest/2.0/';

        for (let i = 0; i < oldURLs.length; i++) {
            const actual = normalizer.normalize(oldURLs[i]);
            assert(actual === normalizedURL);
        }
    });
});
