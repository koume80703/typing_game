const path = require("path");

const express = require("express");
const app = express();

const port = 8080;

app.use((req, res, next) => {
    console.log(req.method, req.path, req.protocol, req.httpVersion);
    next();
});

app.get("*.js", (req, res) => {
    res;
    res.status(200)
        .type(".js")
        // .set("content-type", "application/javascript")
        .sendFile(path.join(__dirname, req.url));
});

app.get("*.css", (req, res) => {
    res.status(200)
        .type(".css")
        // .set("content-type", "text/css")
        .sendFile(path.join(__dirname, req.url));
});

app.get("*.json", (req, res) => {
    res;
    res.status(200)
        .type(".json")
        // .set("content-type", "application/json")
        .sendFile(path.join(__dirname, req.url));
});

app.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
    console.log("Server listen on port " + port);
});
