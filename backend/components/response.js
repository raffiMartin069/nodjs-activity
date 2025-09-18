export class HttpResponse {
    constructor(res) {
        this.res = res;
        this.headersSent = false;
    }

    status(code) {
        this.res.statusCode = code;
        return this;
    }

    setHeader(key, value) {
        this.res.setHeader(key, value);
        return this;
    }

    send(data) {
        if (typeof data === "object" && !Buffer.isBuffer(data)) {
            this.res.setHeader("Content-Type", "application/json");
            this.res.end(JSON.stringify(data));
        } else {
            this.res.setHeader("Content-Type", "text/plain");
            this.res.end(String(data));
        }
        this.headersSent = true;
    }

    json(obj) {
        this.res.setHeader("Content-Type", "application/json");
        this.res.end(JSON.stringify(obj));
        this.headersSent = true;
    }
}
