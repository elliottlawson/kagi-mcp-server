/**
 * Interface for a search result item
 */
interface SearchResultItem {
    t: number;
    title: string;
    url: string;
    published?: string;
    snippet: string;
}
/**
 * Interface for a search response
 */
interface SearchResponse {
    data: SearchResultItem[];
}
/**
 * Formats search results to match the Python implementation's output format
 * @param queries List of search queries
 * @param responses List of search responses corresponding to the queries
 * @returns Formatted search results as a string
 */
export declare function formatSearchResults(queries: string[], responses: SearchResponse[]): string;
export {};
