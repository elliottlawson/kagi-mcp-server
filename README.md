# Kagi MCP Server (Node.js)

A Node.js implementation of the Kagi MCP server that provides web search capabilities to AI assistants using the Kagi search API.

## Features

- Web search using the Kagi API
- Support for multiple search queries in parallel
- Formatted search results
- Built with TypeScript and the official MCP SDK
- Pre-built and ready to use (no build step required)

## Setup Instructions

> Before anything, ensure you have access to the search API. It is currently in closed beta and available upon request. Please reach out to support@kagi.com for an invite.

### Prerequisites

- Node.js 18 or higher
- Kagi API key

### Quick Start (No Installation)

You can run the server directly without installing it using npx:

```bash
KAGI_API_KEY=your_api_key_here npx github:elliottlawson/kagi-mcp-server
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/elliottlawson/kagi-mcp-server.git
cd kagi-mcp-server
```

2. Run directly (no build required):
```bash
KAGI_API_KEY=your_api_key_here node build/index.js
```

If you want to modify the code, you'll need to install dependencies and rebuild:

```bash
npm install
npm run build
```

### Setup with Claude Desktop

Add the following MCP config to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "kagi": {
      "command": "npx",
      "args": ["github:elliottlawson/kagi-mcp-server"],
      "env": {
        "KAGI_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

Alternatively, if you've cloned the repository:

```json
{
  "mcpServers": {
    "kagi": {
      "command": "node",
      "args": ["ABSOLUTE_PATH_TO_REPO/build/index.js"],
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
   - Command: npx github:elliottlawson/kagi-mcp-server
   - Environment Variables: KAGI_API_KEY=YOUR_API_KEY_HERE

### Ask an AI Assistant a Question Requiring Search

For example: "Who was time's 2024 person of the year?"

## Debugging

Run the MCP Inspector to debug the server:

```bash
npx @modelcontextprotocol/inspector npx github:elliottlawson/kagi-mcp-server
```

Or if you've cloned the repository:

```bash
npx @modelcontextprotocol/inspector node build/index.js
```

Then access MCP Inspector at `http://localhost:5173`. You may need to add your Kagi API key in the environment variables in the inspector under `KAGI_API_KEY`.

## Development

### Project Structure

```
kagi-mcp-server/
├── src/
│   ├── index.ts           # Main entry point
│   ├── kagi-client.ts     # Kagi API client
│   └── utils/
│       └── formatter.ts   # Result formatting utilities
├── build/                 # Pre-built JavaScript files
│   ├── index.js           # Executable entry point
│   ├── kagi-client.js
│   └── utils/
│       └── formatter.js
├── package.json
├── tsconfig.json
└── README.md
```

### Building

If you make changes to the TypeScript code, rebuild the project:

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
- The repository includes pre-built JavaScript files, so no build step is required to use it
