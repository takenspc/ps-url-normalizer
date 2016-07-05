import { testUrls } from './helper';

describe('ecma', () => {
    it('should normalize urls of ECMA-262 5.1', (done) => {
        const urls = [
            'http://ecma-international.org/ecma-262/5.1/',
            'http://www.ecma-international.org/ecma-262/5.1/index.html',
        ];

        const expected = 'http://www.ecma-international.org/ecma-262/5.1/';

        testUrls(urls, expected, done);
    });

    it('should normalize urls of ECMA-262 6.0 draft', (done) => {
        const urls = [
            'http://people.mozilla.org/~jorendorff/es6-draft.html#sec-promise-objects',
            'https://people.mozilla.org/~jorendorff/es6-draft.html#sec-promise-objects',
        ];

        const expected = 'https://tc39.github.io/ecma262/#sec-promise-objects';

        testUrls(urls, expected, done);
    });

    it('should normalize urls of ECMA-262 6.0', (done) => {
        const urls = [
            'http://ecma-international.org/ecma-262/6.0/',
            'http://www.ecma-international.org/ecma-262/6.0/index.html',
        ];

        const expected = 'https://tc39.github.io/ecma262/';

        testUrls(urls, expected, done);
    });

    it('should normalize urls of ECMA-402', (done) => {
        const urls = [
            'http://ecma-international.org/ecma-402/1.0/',
            'http://www.ecma-international.org/ecma-402/2.0/index.html',
        ];

        const expected = 'https://tc39.github.io/ecma402/';

        testUrls(urls, expected, done);
    });
});
