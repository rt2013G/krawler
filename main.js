const { argv, exit } = require('node:process');
const { crawlPage } = require('./crawl');

async function main() {
    if(argv.length !== 3) {
        console.log("error. usage: npm start <url>");
        exit(1);
    }
    const url = argv[2];
    console.log(`starting krawler at url ${url}...`);
    const pages = await crawlPage(url, url, {});
    console.log(pages);
}

main()