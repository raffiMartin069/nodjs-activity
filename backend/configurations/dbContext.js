import { promises as fs } from 'fs';

export class DbContext {

    databaseUrl;
    database;

    constructor(databaseUrl) {
        this.databaseUrl = databaseUrl;
        this.database = null;
    }

    async getDatabase() {
        if (this.database) {
            return this.database;
        }
        if(!this.databaseUrl) {
            throw new Error('Database not initialized');
        }
        const raw = await fs.readFile(new URL(this.databaseUrl, import.meta.url), 'utf-8');
        this.database = JSON.parse(raw);
        return this.database;
    }

}