import { testUrls } from './helper';

describe('w3c', () => {
    it('should leave search params of url as it is', (done) => {
        const urls = [
            'https://www.w3.org/Bugs/Public/show_bug.cgi?id=28553'
        ];
        
        const expected = urls[0];

        testUrls(urls, expected, done);
    });

    it('should normalize protocol', (done) => {
        const urls = [
            'http://www.w3.org/TR/CSS/'
        ];
        const expected = 'https://www.w3.org/TR/CSS/';

        testUrls(urls, expected, done);
    });

    it('should normalize old HTML drafts', (done) => {
        const urls = [
            'https://www.w3.org/html/wg/drafts/html/CR/',
        ];
        const expected = 'https://w3c.github.io/html/html/CR/';

        testUrls(urls, expected, done);
    });

    it('should normalize old HTML drafts', (done) => {
        const urls = [
            'https://www.w3.org/html/wg/drafts/html/master/browsers.html#offline',
        ];

        const expected = 'https://w3c.github.io/html/browsers.html#offline';
        testUrls(urls, expected, done);
    });
});
