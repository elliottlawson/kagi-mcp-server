#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { KagiClient } from "./kagi-client.js";
import { formatSearchResults } from "./utils/formatter.js";

// Check for API key early
if (!process.env.KAGI_API_KEY) {
  console.error("\n⚠️  ERROR: KAGI_API_KEY environment variable is not set");
  console.error("Please set the KAGI_API_KEY environment variable to your Kagi API key");
  console.error("Example: KAGI_API_KEY=your_api_key_here node build/index.js\n");
}

// Initialize Kagi client
const kagiClient = new KagiClient();

// Create server instance
const server = new McpServer({
  name: "kagi-mcp",
  version: "0.1.0",
  dependencies: ["axios", "@modelcontextprotocol/sdk"]
});

// Define search tool
server.tool(
  "kagi_web_search",
  "Perform web search using the Kagi search engine. Results are from all queries given. They are numbered continuously, so that a user may be able to refer to a result by a specific number.",
  {
    queries: z.array(z.string()).describe(
      "One or more concise, keyword-focused search queries. Include essential context within each query for standalone use."
    ),
  },
  async ({ queries }) => {
    try {
      if (!queries || queries.length === 0) {
        throw new Error("Search called with no queries.");
      }

      // Check API key before attempting search
      if (!process.env.KAGI_API_KEY) {
        throw new Error("KAGI_API_KEY environment variable is not set. Please provide a valid Kagi API key.");
      }

      // Perform searches in parallel
      const searchPromises = queries.map(query => kagiClient.search(query));
      const results = await Promise.all(searchPromises);

      // Format the results
      const formattedResults = formatSearchResults(queries, results);

      return {
        content: [
          {
            type: "text",
            text: formattedResults,
          },
        ],
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      // Provide a more user-friendly error message for authentication issues
      let userFriendlyError = errorMessage;
      if (errorMessage.includes("401") || errorMessage.includes("Authentication failed") || errorMessage.includes("API key")) {
        userFriendlyError = "Authentication failed: Please check that your Kagi API key is valid and properly set in the KAGI_API_KEY environment variable.";
      }
      
      return {
        content: [
          {
            type: "text",
            text: `Error: ${userFriendlyError}`,
          },
        ],
      };
    }
  }
);

/**
 * Main function to start the MCP server
 */
async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Kagi MCP Server running on stdio");
    
    // Print a reminder about the API key if it's not set
    if (!process.env.KAGI_API_KEY) {
      console.error("\n⚠️  WARNING: KAGI_API_KEY environment variable is not set");
      console.error("The search functionality will not work without a valid API key\n");
    }
  } catch (error) {
    console.error("Error starting MCP server:", error);
    process.exit(1);
  }
}

// Start the server
main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
