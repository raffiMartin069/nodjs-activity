import { createServer } from 'node:http';
import { HomeController } from './controllers/homeController.js';
import { DbContext } from './configurations/dbContext.js';
import path from 'path';
import url from 'url';

const cors = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (res.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return true;
    }
    return false;
}

const bootstrap = async () => {

    const databasePath = path.resolve() + '/database.json';
    const db = new DbContext(databasePath);
    const databaseInstance = await db.getDatabase();

    const server = createServer(async (req, res) => {
        if (cors(res)) return;
        const parsedUrl = url.parse(req.url, true);
        const key = `${req.method} ${parsedUrl.pathname}`;
        const apiController = new HomeController(databaseInstance);
        
        switch (key) {
            case "GET /":
                await apiController.Authentication(req, res);
                break;
            case "GET /topics":
                await apiController.Topics(req, res);
                break;
            default:
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "Not Found" }));
                break;
        }
        
    });

    const PORT = 3000;
    server.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

try {
    bootstrap();
} catch (error) {
    console.error("Failed to start the server:", error);
}