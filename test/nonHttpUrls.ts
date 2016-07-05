import { testUrls } from './helper';

describe('index', () => {
    it('should leave non http urls as they are', (done) => {
        const urls = [
            'javascript:void(0)',
            'mailto:example@example.com',
            'about:blank',
            'blob:https://whatwg.org/d0360e2f-caee-469f-9a2f-87d5b0456f6f',
        ];

        testUrls(urls, urls, done);
    });
});
