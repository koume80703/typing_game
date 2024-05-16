const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    console.log(req.method, req.url, req.httpVersion);

    let filePath = path.join(
        __dirname,
        req.url === "/" ? "index.html" : req.url
    );
    let extname = path.extname(filePath);
    let contentType = "text/html";

    switch (extname) {
        case ".js":
            contentType = "application/javascript";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".json":
            contentType = "application/json";
            break;
    }

    fs.readFile(filePath, (error, content) => {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content);
    });
});

const port = 8080;
server.listen(port, () => {
    console.log("Server listen on port " + port);
});
