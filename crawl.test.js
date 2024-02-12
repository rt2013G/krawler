const { test, expect } = require("@jest/globals")
const { normalizeURL } = require('./crawl.js')

test('https://github.com/rt2013G', () => {
    expect(normalizeURL('https://github.com/rt2013G')).toBe('github.com/rt2013G');
})

test('http://github.com/rt2013G', () => {
    expect(normalizeURL('http://github.com/rt2013G')).toBe('github.com/rt2013G');
})

test('https://github.com/rt2013G/', () => {
    expect(normalizeURL('https://github.com/rt2013G/')).toBe('github.com/rt2013G');
})

test('http://github.com/rt2013G/', () => {
    expect(normalizeURL('http://github.com/rt2013G/')).toBe('github.com/rt2013G');
})