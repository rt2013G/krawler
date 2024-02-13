const { test, expect } = require("@jest/globals")
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')

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


test('getURLsFromHTML', () => {
    const html = `
        <html>
            <body>
                <a href="http://github.com/rt2013G/">
                    github link
                </a>
            </body>
        </html>
    `;
    const baseURL = 'https://github.com/rt2013G'
    const urls = ['http://github.com/rt2013G/'];
    expect(getURLsFromHTML(html, baseURL)).toStrictEqual(urls);
})

test('getURLsFromHTML test 2', () => {
    const html = `
        <html>
            <body>
                <a href="/krawler/">
                    repo link
                </a>
            </body>
        </html>
    `;
    const baseURL = 'https://github.com/rt2013G'
    const urls = ['https://github.com/rt2013G/krawler/'];
    expect(getURLsFromHTML(html, baseURL)).toStrictEqual(urls);
})

test('getURLsFromHTML test 3', () => {
    const html = `
        <html>
            <body>
                <a href="/krawler/">
                    repo link
                </a>
                <a href="/tw6-calarium">
                    repo link
                </a>
                <a href="https://github.com/rt2013G">
                    github link
                </a>
            </body>
        </html>
    `;
    const baseURL = 'https://github.com/rt2013G'
    const urls = ['https://github.com/rt2013G/krawler/',
                    'https://github.com/rt2013G/tw6-calarium',
                    'https://github.com/rt2013G'];
    expect(getURLsFromHTML(html, baseURL)).toStrictEqual(urls);
})