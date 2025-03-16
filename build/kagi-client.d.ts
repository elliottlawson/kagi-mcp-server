/**
 * Client for interacting with the Kagi Search API
 */
export declare class KagiClient {
    private apiKey;
    private baseUrl;
    /**
     * Creates a new KagiClient instance
     * Reads the API key from the KAGI_API_KEY environment variable
     */
    constructor();
    /**
     * Performs a search using the Kagi API
     * @param query The search query
     * @returns The search results
     */
    search(query: string): Promise<any>;
}
