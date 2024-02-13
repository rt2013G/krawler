const { test, expect } = require("@jest/globals")
const { sortPages } = require('./report.js')

test('sortPages', () => {
    const pages = {
        'https://github.com/rt2013G': 6
    }
    const sorted = [
        ['https://github.com/rt2013G', 6]
    ]
    expect(sortPages(pages)).toStrictEqual(sorted);
})

test('sortPages', () => {
    const pages = {
        'https://github.com/rt2013G': 10,
        'https://github.com/rt2013G/krawler/': 145,
        'https://github.com/rt2013G/tw6-calarium': 1,
    }
    const sorted = [
        ['https://github.com/rt2013G/krawler/', 145],
        ['https://github.com/rt2013G', 10],
        ['https://github.com/rt2013G/tw6-calarium', 1]
    ]
    expect(sortPages(pages)).toStrictEqual(sorted);
})