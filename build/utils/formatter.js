/**
 * Formats search results to match the Python implementation's output format
 * @param queries List of search queries
 * @param responses List of search responses corresponding to the queries
 * @returns Formatted search results as a string
 */
export function formatSearchResults(queries, responses) {
    const perQueryResponseStrs = [];
    let startIndex = 1;
    for (let i = 0; i < queries.length; i++) {
        const query = queries[i];
        const response = responses[i];
        // Filter for search results (t == 0)
        const results = response.data.filter(result => result.t === 0);
        const formattedResultsList = results.map((result, idx) => {
            const resultNumber = startIndex + idx;
            return [
                `${resultNumber}: ${result.title}`,
                `${result.url}`,
                `Published Date: ${result.published || "Not Available"}`,
                `${result.snippet}`
            ].join("\n");
        });
        startIndex += results.length;
        const formattedResultsStr = formattedResultsList.join("\n\n");
        const queryResponseStr = [
            "-----",
            `Results for search query "${query}":`,
            "-----",
            formattedResultsStr
        ].join("\n");
        perQueryResponseStrs.push(queryResponseStr);
    }
    return perQueryResponseStrs.join("\n\n");
}
//# sourceMappingURL=formatter.js.map