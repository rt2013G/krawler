function printReport(pages) {
    const sorted = sortPages(pages);
    printReportMarker();
    for(const tuple of sorted) {
        console.log(`page ${tuple[0]} found ${tuple[1]} times.`);
    }
    printReportMarker();
}

function sortPages(pages) {
    const pagesList = Object.entries(pages);
    pagesList.sort((p1, p2) => {
        p1Count = p1[1];
        p2Count = p2[1];
        return p2[1] - p1[1];
    });

    return pagesList;
}

function printReportMarker() {
    console.log('----------------------------------');
    console.log('----------------------------------');
    console.log('----------------------------------');
}

module.exports = {
    printReport,
    sortPages
}
