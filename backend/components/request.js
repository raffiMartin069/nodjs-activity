export class HttpRequest {

    method;
    url;
    headers;
    body;

    constructor(method, url, headers = {}, body = null) {
        this.method = method;
        this.url = url;
        this.headers = headers;
        this.body = body;
    }

}