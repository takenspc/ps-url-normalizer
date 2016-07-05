import * as assert from 'assert';
import * as normalizer from '../';

export function testUrls(urls: string[], expected: string | string[], done: MochaDone): void {
    Promise.all<string>(urls.map((url) => {
        return normalizer.normalize(url);
    })).then((actuals) => {
        actuals.forEach((actual, i) => {
            const exp = (Array.isArray(expected)) ? expected[i] : expected;
            assert(actual === exp, `${urls[i]} should be normalized as ${exp}, got ${actual}`);
        });
    }).then(() => { done() }, done);
}
