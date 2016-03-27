declare module 'parse5' {
	import stream = require('stream');

    interface Attr {
        name: string
        value: string
    }

    class SAXParser extends stream.Transform {
        stop(): void
    }

}