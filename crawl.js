const { JSDOM } = require('jsdom');

function normalizeURL(url) {
    const urlObj = new URL(url);
    let urlString = urlObj.hostname + urlObj.pathname;
    if(urlString.slice(-1) == '/') {
        urlString = urlString.substring(0, urlString.length - 1);
    }
    return urlString;
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    for(elem of dom.window.document.querySelectorAll('a')) {
        if(elem.href.charAt(0) === '/') {
            urls.push(baseURL + elem.href);
        } else {
            urls.push(elem.href);
        }
    }
    return urls;
}

async function crawlPage(baseURL, currentURL, pages) {
    const objBaseUrl = new URL(baseURL);
    const objCurrentUrl = new URL(currentURL);
    if(objBaseUrl.hostname !== objCurrentUrl.hostname) {
        return pages;
    }

    const normalizedCurrentURL = normalizeURL(currentURL);
    if(pages[normalizedCurrentURL]) {
        pages[normalizedCurrentURL]++;
        return pages;
    } else {
        if(baseURL == currentURL) {
            pages[normalizedCurrentURL] = 0;
        } else {
            pages[normalizedCurrentURL] = 1;
        }
    }

    console.log(`fetching at url ${currentURL}`)

    let response = null;
    try {
        response = await fetch(currentURL);
    } catch(err) {
        return pages;
    }
    
    if(response.status >= 400) {
        console.log(`error: ${response.status}`);
        return pages;
    }
    try {
        const type = response.headers.get('content-type');
        if(!type.includes('text/html')) {
            console.log(`no html at: ${currentURL}, content-type: ${type}`);
            return pages;
        }
    } catch(err) {
        console.log(err.message);
        return pages;
    }

    const html = await response.text();
    const urls = getURLsFromHTML(html, baseURL);

    for(const url of urls) {
        pages = await crawlPage(baseURL, url, pages);
    }

    return pages;
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
  }
  