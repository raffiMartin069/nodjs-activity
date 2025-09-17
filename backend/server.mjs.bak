import { createServer } from "node:http";
import { URL } from "node:url";

const routes = new Map();

function setCors(res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

routes.set("GET /topics", async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const topicId = url.searchParams.get("topicId");
    console.log("Fetching topics", topicId ? `for topicId: ${topicId}` : "all topics");

    const payload = { topics: ["Variables", "Objects", "Arrays", "Functions"], topicId };

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(payload));
});


const server = createServer((req, res) => {
    setCors(res);
    const url = new URL(req.url, `http://${req.headers.host}`);
    const key = `${req.method} ${url.pathname}`;
    console.log(`Received ${req.method} ${url.pathname}`);
    const handler = routes.get(key);
    if (handler) return handler(req, res);
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found\n");
});

server.listen(4000, "127.0.0.1", () => {
    console.log("Listening on 127.0.0.1:4000");
});
