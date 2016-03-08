'use strict';
import * as assert from 'power-assert';
import * as normalizer from '../';

//
describe('github.io', () => {
    it('should normalize protocol', () => {
        const httpURL = 'http://tc39.github.io/Array.prototype.includes/';
        const actual = normalizer.normalize(httpURL);
        const expected = 'https://tc39.github.io/Array.prototype.includes/';
        assert(actual === expected);
    });

    it('should normalize urls of default index', () => {
        const oldURL = 'https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html';
        const normalizedURL = 'https://slightlyoff.github.io/ServiceWorker/spec/service_worker/';

        const actual = normalizer.normalize(oldURL);
        assert(actual === normalizedURL);
    });

    it('should normalize urls of single directory', () => {
        const oldURL = 'https://w3c.github.io/mediacapture-output';
        const normalizedURL = 'https://w3c.github.io/mediacapture-output/';

        const actual = normalizer.normalize(oldURL);
        assert(actual === normalizedURL);
    });
});
