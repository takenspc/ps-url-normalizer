'use strict';
import * as assert from 'power-assert';
import * as url from 'url';
import * as ecma from '../rules/ietf';

//
describe('ietf', () => {
    it('should normalize urls of RFCs', () => {
        const urls = [
            'http://www.ietf.org/rfc/rfc6066',
            'http://www.ietf.org/rfc/rfc6066.txt',
            'http://tools.ietf.org/rfc/rfc6066',
            'http://tools.ietf.org/rfc/rfc6066.txt',
            'http://tools.ietf.org/html/rfc6066',
            'http://tools.ietf.org/html/rfc6066.txt',
        ];

        const expected = 'https://tools.ietf.org/html/rfc6066';

        for (let i = 0; i < urls.length; i++) {
            const actual = ecma.normalize(url.parse(urls[i]), true);
            assert(actual === expected);
        }
    });

    it('should normalize urls of draft RFCs', () => {
        const urls = [
            'http://www.ietf.org/internet-drafts/draft-ietf-httpbis-client-hints-00',
            'http://www.ietf.org/internet-drafts/draft-ietf-httpbis-client-hints-00.txt',
            'http://www.ietf.org/id/draft-ietf-httpbis-client-hints-00',
            'http://www.ietf.org/id/draft-ietf-httpbis-client-hints-00.txt',
            'http://tools.ietf.org/internet-drafts/draft-ietf-httpbis-client-hints-00',
            'http://tools.ietf.org/internet-drafts/draft-ietf-httpbis-client-hints-00.txt',
            'http://tools.ietf.org/id/draft-ietf-httpbis-client-hints-00',
            'http://tools.ietf.org/id/draft-ietf-httpbis-client-hints-00.txt',
            'http://tools.ietf.org/html/draft-ietf-httpbis-client-hints-00',
            'http://tools.ietf.org/html/draft-ietf-httpbis-client-hints-00.txt',
        ];

        const expected = 'https://tools.ietf.org/html/draft-ietf-httpbis-client-hints-00';

        for (let i = 0; i < urls.length; i++) {
            const actual = ecma.normalize(url.parse(urls[i]), true);
            assert(actual === expected);
        }
    });
});
