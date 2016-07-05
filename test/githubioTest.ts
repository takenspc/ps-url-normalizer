import { testUrls } from './helper';

describe('github.io', () => {
    it('should normalize protocol', (done) => {
        const urls = [
            'http://tc39.github.io/Array.prototype.includes/'
        ];
        const expected = 'https://tc39.github.io/Array.prototype.includes/';
        testUrls(urls, expected, done);
    });

    it('should normalize urls with default index', (done) => {
        const urls = [
            'https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html'
        ];
        const expected = 'https://slightlyoff.github.io/ServiceWorker/spec/service_worker/';

        testUrls(urls, expected, done);
    });

    it('should normalize urls with slashless directory', (done) => {
        const urls = [
            'https://w3c.github.io/mediacapture-output'
        ];
        const expected = 'https://w3c.github.io/mediacapture-output/';

        testUrls(urls, expected, done);
    });
});
