# Kagi MCP Server (Node.js)

A Node.js implementation of the Kagi MCP server that provides web search capabilities to AI assistants using the Kagi search API.

## Features

- Web search using the Kagi API
- Support for multiple search queries in parallel
- Formatted search results
- Built with TypeScript and the official MCP SDK

## Setup Instructions

> Before anything, ensure you have access to the search API. It is currently in closed beta and available upon request. Please reach out to support@kagi.com for an invite.

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Kagi API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/elliottlawson/kagi-mcp-server2.git
cd kagi-mcp-server2
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

This will generate the `/build/index.js` file - your compiled MCP server script.

### Setup with Claude Desktop

Add the following MCP config to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "kagi": {
      "command": "node",
      "args": ["ABSOLUTE_PATH_TO_MCP_SERVER/build/index.js"],
      "env": {
        "KAGI_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

### Setup with Cursor

1. Go to Cursor Settings -> MCP -> Add new MCP server
2. Configure your MCP:
   - Name: Kagi Search
   - Type: command
   - Command: node ABSOLUTE_PATH_TO_MCP_SERVER/build/index.js
   - Environment Variables: KAGI_API_KEY=YOUR_API_KEY_HERE

### Ask an AI Assistant a Question Requiring Search

For example: "Who was time's 2024 person of the year?"

## Debugging

Run the MCP Inspector to debug the server:

```bash
npx @modelcontextprotocol/inspector node ABSOLUTE_PATH_TO_MCP_SERVER/build/index.js
```

Then access MCP Inspector at `http://localhost:5173`. You may need to add your Kagi API key in the environment variables in the inspector under `KAGI_API_KEY`.

## Development

### Project Structure

```
kagi-mcp-server2/
├── src/
│   ├── index.ts           # Main entry point
│   ├── kagi-client.ts     # Kagi API client
│   └── utils/
│       └── formatter.ts   # Result formatting utilities
├── package.json
├── tsconfig.json
└── README.md
```

### Building

To build the project:

```bash
npm run build
```

### Running

To run the server:

```bash
npm start
```

## Notes

- The log level can be adjusted through the `DEBUG` environment variable
- The server uses stdio for communication with the MCP client
