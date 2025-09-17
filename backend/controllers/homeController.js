import { BaseController } from '../configurations/baseController.js';
import url from 'url';

export class HomeController extends BaseController {

    async Authentication(req, res) {
        try {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: this.database.users }));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message }));
            return;
        }
    }

    async Topics(req, res) {
        const parsedUrl = url.parse(req.url, true);
        const search = (parsedUrl.query.search || "").toLowerCase();
        const results = this.database.topics.filter(topic =>
            topic.name.toLowerCase().includes(search) ||
            topic.description.toLowerCase().includes(search)
        );

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ results }));
    }

}