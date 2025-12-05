import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// create a MCP server 
const server = new McpServer({
    name: "Currency Converter MCP server",
    version: "1.0.0",
    description: "Currency Converter MCP server",
});


// tool

server.tool(
    "currencyConverter",
    "Convert Amount from one currency to another currency",
    {
        amount: z.number().describe("Amount to convert"),
        from: z.string().describe("Base currency code, e.g USD"),
        to: z.string().describe("Target Currency code, e.g INR"),
    },


    async ({ amount, from, to }) => {
        try {
            const res = await fetch(`https://open.er-api.com/v6/latest/${from.toUpperCase()}`);
            const data = await res.json();
            const rate = data.rates[to.toUpperCase()];
            const converted = `${amount} ${from.toUpperCase()} = ${(amount * rate).toFixed(2)} ${to.toUpperCase()}`;
            return {
                content: [
                    {
                        type: "text",
                        text: converted
                    }
                ]
            }
        } catch (error) {
            return {
                content: [
                    {
                        type: "text",
                        text: "Error: " + error.message
                    }
                ]
            }
        }
    }
);


// start the server with stdio transport 
async function startServer() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Server started");
}

startServer().catch((error) => {
    console.error("Failed to start MCP server.", error);
    process.exit(1);
});   