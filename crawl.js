function normalizeURL(url) {
    const urlObj = new URL(url);
    let urlString = urlObj.hostname + urlObj.pathname;
    if(urlString.slice(-1) == '/') {
        urlString = urlString.substring(0, urlString.length - 1);
    }
    return urlString;
}

module.exports = {
    normalizeURL
  }
  