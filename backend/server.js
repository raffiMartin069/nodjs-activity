import { createServer } from 'node:http';
import { HttpRequest } from './components/request.js';
import { HttpResponse } from './components/response.js';
import { promises as fs } from 'node:fs';

// Arrow function using ES6 syntax
const server = createServer( async (req, res) => {

    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    req.url = parsedUrl.pathname;

    // Class objects
    const request = new HttpRequest(req.method, req.url, req.headers);
    const response = new HttpResponse(res);

    const database = JSON.parse(await fs.readFile('./database.json'), 'utf-8');

    if (request.url === '/') {
        response.status(200).send('Hello, welcome to our school website!');
    } else if (request.url === '/students') {
        // Array of student objects
        var students = [];
        for (const studs in database.students) {
            students.push(database.students[studs]);
        }
        response.status(200).send(students);
    } else if (request.url === '/topics') {
        let topics = JSON.parse(await fs.readFile('./database.json'), 'utf-8');
        response.status(200).send(database.topics);
    } else {
        response.status(404).send({ error: 'Not Found' });
    }

});

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});