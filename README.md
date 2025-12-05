# 🎓 Mastering Model Context Protocol (MCP) - Course Repo

Welcome to the **Mastering MCP** course repository! 🚀

This repository is your playground for learning the **Model Context Protocol (MCP)**. It contains a collection of independent projects, each designed to teach you specific concepts of building MCP servers and clients.

---

## 📚 What is Model Context Protocol (MCP)?

The **Model Context Protocol (MCP)** is an open standard that enables AI models (like Claude) to securely interact with local or remote resources. It acts as a universal translator between AI and your data/tools.

### Core Concepts
-   **MCP Server**: The backend application that exposes capabilities (tools, resources, prompts).
-   **MCP Client**: The frontend application (e.g., Claude Desktop, IDEs) that uses these capabilities.
-   **Tools**: Executable functions (e.g., "Calculate tax", "Fetch weather").
-   **Resources**: Static or dynamic data (e.g., "File contents", "Database rows").
-   **Prompts**: Reusable templates for AI interactions.

---

## ⚡ Getting Started (Global)

### Prerequisites
Before running any project in this repo, ensure you have:
1.  **Node.js** (v16 or higher) installed.
2.  **NPM** (Node Package Manager).

### Installation
Clone this repository and install the shared dependencies:

```bash
npm install
```

---

## 📂 Available Projects

This repository is organized into different examples. Below is the list of available projects you can run and explore.

### 1️⃣ Project 1: Currency Converter Server
**Focus**: Basics of MCP, Tools, and Stdio Transport.

This project implements a simple MCP server that provides a tool to convert currencies using real-time exchange rates.

-   **Main File**: `currencyConvertor.js`
-   **Key Features**:
    -   Defines a custom tool `currencyConverter`.
    -   Uses `zod` for input validation.
    -   Fetches data from an external API.

#### How to Run
```bash
node currencyConvertor.js
```

#### Code Deep Dive (Currency Converter)
<details>
<summary>Click to expand explanation</summary>

**1. Server Setup**
```javascript
const server = new McpServer({
    name: "Currency Converter MCP server",
    version: "1.0.0",
});
```

**2. Tool Definition**
```javascript
server.tool(
    "currencyConverter",
    "Convert Amount from one currency to another",
    {
        amount: z.number(),
        from: z.string(),
        to: z.string(),
    },
    async ({ amount, from, to }) => { ... }
);
```

**3. Connection**
```javascript
const transport = new StdioServerTransport();
await server.connect(transport);
```
</details>

#### 🔌 Connect to Claude Desktop
Add this to your `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "currency-converter": {
      "command": "node",
      "args": ["C:\\path\\to\\this\\repo\\currencyConvertor.js"]
    }
  }
}
```

---

### 2️⃣ Project 2: (Coming Soon)
*Stay tuned for more advanced examples covering Resources and Prompts!*

---

## 🎮 Interactive Learning

To truly master MCP, try these challenges on the existing projects:

1.  **Modify the Currency Converter**: Add a `listCurrencies` tool.
2.  **Create a New Server**: Create a file named `helloWorld.js` and build a server that has a tool to say "Hello, [Name]!".

---

**Happy Learning!** 🌟
