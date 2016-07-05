import { testUrls } from './helper';

describe('ietf', () => {
    it('should normalize urls of RFCs', (done) => {
        const urls = [
            'http://www.ietf.org/rfc/rfc6066',
            'http://www.ietf.org/rfc/rfc6066.txt',
            'http://tools.ietf.org/rfc/rfc6066',
            'http://tools.ietf.org/rfc/rfc6066.txt',
            'http://tools.ietf.org/html/rfc6066',
            'http://tools.ietf.org/html/rfc6066.txt',
        ];

        const expected = 'https://tools.ietf.org/html/rfc6066';

        testUrls(urls, expected, done);
    });

    it('should normalize urls of draft RFCs', (done) => {
        const urls = [
            'http://www.ietf.org/internet-drafts/draft-ietf-httpbis-client-hints',
            'http://www.ietf.org/internet-drafts/draft-ietf-httpbis-client-hints.txt',
            'http://www.ietf.org/id/draft-ietf-httpbis-client-hints',
            'http://www.ietf.org/id/draft-ietf-httpbis-client-hints.txt',
            'http://tools.ietf.org/internet-drafts/draft-ietf-httpbis-client-hints',
            'http://tools.ietf.org/internet-drafts/draft-ietf-httpbis-client-hints.txt',
            'http://tools.ietf.org/id/draft-ietf-httpbis-client-hints',
            'http://tools.ietf.org/id/draft-ietf-httpbis-client-hints.txt',
            'http://tools.ietf.org/html/draft-ietf-httpbis-client-hints',
            'http://tools.ietf.org/html/draft-ietf-httpbis-client-hints.txt',
            'http://datatracker.ietf.org/doc/draft-ietf-httpbis-client-hints',
            'http://datatracker.ietf.org/doc/draft-ietf-httpbis-client-hints/',
        ];

        const expected = 'https://tools.ietf.org/html/draft-ietf-httpbis-client-hints';

        testUrls(urls, expected, done);
    });
});
