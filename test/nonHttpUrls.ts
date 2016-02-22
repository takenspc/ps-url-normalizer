'use strict';
import * as assert from 'power-assert';
import * as normalizer from '../';


describe('index', () => {
    it('should leave non http urls as they are', () => {
        const urls = [
            'javascript:void(0)',
            'mailto:example@example.com',
            'about:blank',
            'blob:https://whatwg.org/d0360e2f-caee-469f-9a2f-87d5b0456f6f',
        ];

        for (let i = 0; i < urls.length; i++) {
            const url = urls[i];
            assert(normalizer.normalize(url) === url);
        }
    });
});
