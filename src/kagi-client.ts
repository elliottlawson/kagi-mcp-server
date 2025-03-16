import axios from "axios";

/**
 * Client for interacting with the Kagi Search API
 */
export class KagiClient {
  private apiKey: string;
  private baseUrl: string = "https://kagi.com/api/v0";

  /**
   * Creates a new KagiClient instance
   * Reads the API key from the KAGI_API_KEY environment variable
   */
  constructor() {
    this.apiKey = process.env.KAGI_API_KEY || "";
    if (!this.apiKey) {
      console.error("⚠️ KAGI_API_KEY environment variable is not set. The search functionality will not work without a valid API key.");
    }
  }

  /**
   * Performs a search using the Kagi API
   * @param query The search query
   * @returns The search results
   */
  async search(query: string): Promise<any> {
    try {
      if (!this.apiKey) {
        throw new Error("KAGI_API_KEY environment variable is not set. Please provide a valid Kagi API key.");
      }

      const response = await axios.get(`${this.baseUrl}/search`, {
        params: { q: query },
        headers: {
          "Authorization": `Bot ${this.apiKey}`
        },
        timeout: 10000 // 10 seconds timeout
      });
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(`Error searching for "${query}":`, error.message);
        
        if (error.response) {
          if (error.response.status === 401) {
            throw new Error("Authentication failed: Invalid or expired Kagi API key. Please check your KAGI_API_KEY environment variable.");
          }
          console.error(`Status: ${error.response.status}, Data:`, error.response.data);
        }
      } else {
        console.error(`Error searching for "${query}":`, error);
      }
      throw error;
    }
  }
}
