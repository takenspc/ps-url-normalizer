'use strict'; // XXX

class CacheEntry<T> {
    datetime: number
    value: T
    constructor(value: T) {
        this.datetime = Date.now();
        this.value = value;
    }
}

export class Cache<T> {
    private timeout: number = 3600 * 1000;

    private map: Map<T, CacheEntry<T>> = new Map();

    get(key: T): T {
        if (this.has(key)) {
            return this.map.get(key).value;
        }

        return null;
    }
    
    has(key: T): boolean {
        const entry = this.map.get(key);

        if (entry && (Date.now() - entry.datetime < this.timeout)) {
            return true;
        }
        return false;
    }
    
    set(key: T, value: T) {
        this.map.set(key, new CacheEntry<T>(value));
    }
}