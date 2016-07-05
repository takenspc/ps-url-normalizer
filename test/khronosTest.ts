import { testUrls } from './helper';

describe('khronos', () => {
    it('should normalize protocol', (done) => {
        const urls = [
            'http://www.khronos.org/registry/webgl/specs/latest/1.0/',
        ];
        const expected = 'https://www.khronos.org/registry/webgl/specs/latest/1.0/';

        testUrls(urls, expected, done);
    });

    it('should normalize urls of WebGL 1', (done) => {
        const urls = [
            'https://www.khronos.org/registry/webgl/specs/latest/',
            'https://www.khronos.org/registry/webgl/specs/1.0/',
        ];

        const expected = 'https://www.khronos.org/registry/webgl/specs/latest/1.0/';

        testUrls(urls, expected, done);
    });

    it('should normalize urls of WebGL 2', (done) => {
        const urls = [
            'https://www.khronos.org/registry/webgl/specs/2.0/',
        ];

        const expected = 'https://www.khronos.org/registry/webgl/specs/latest/2.0/';

        testUrls(urls, expected, done);
    });
});
