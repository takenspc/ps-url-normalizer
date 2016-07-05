import { testUrls } from './helper';

describe('whatwg', () => {
    it('should normalize protocol', (done) => {
        const urls = [
            'http://dom.spec.whatwg.org/'
        ];
        const expected = 'https://dom.spec.whatwg.org/';

        testUrls(urls, expected, done);
    });

    it('should normalize urls of html standard', (done) => {
        const urls = [
            'http://whatwg.org/html/#applicationcache',
            'http://whatwg.org/html#2dcontext',
            'http://www.whatwg.org/specs/web-apps/current-work/#attr-fe-minlength',
            'http://www.whatwg.org/specs/web-apps/current-work/multipage/association-of-controls-and-forms.html#constraints',
            'https://html.spec.whatwg.org/#imagebitmapfactories',
            'https://developers.whatwg.org/states-of-the-type-attribute.html#attr-input-accept',
        ];

        const expected = [
            'https://html.spec.whatwg.org/multipage/browsers.html#applicationcache',
            'https://html.spec.whatwg.org/multipage/scripting.html#2dcontext',
            'https://html.spec.whatwg.org/multipage/forms.html#attr-fe-minlength',
            'https://html.spec.whatwg.org/multipage/forms.html#constraints',
            'https://html.spec.whatwg.org/multipage/webappapis.html#imagebitmapfactories',
            'https://html.spec.whatwg.org/multipage/forms.html#attr-input-accept',
        ];

        testUrls(urls, expected, done);
    });
});
