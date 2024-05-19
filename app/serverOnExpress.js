const path = require("path");
const express = require("express");

const app = express();

let filePath;

app.use((req, res, next) => {
    console.log(req.method, req.path, req.protocol, req.httpVersion);
    filePath = path.join(__dirname, "public", req.url);
    next();
});

app.get("*.js", (req, res) => {
    res;
    res.status(200)
        .type(".js")
        // .set("content-type", "application/javascript")
        .sendFile(filePath);
});

app.get("*.css", (req, res) => {
    res.status(200)
        .type(".css")
        // .set("content-type", "text/css")
        .sendFile(filePath);
});

app.get("*.json", (req, res) => {
    res;
    res.status(200)
        .type(".json")
        // .set("content-type", "application/json")
        .sendFile(filePath);
});

app.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "public/html", "index.html"));
});

app.get("/admin", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "public/html", "admin.html"));
});

const port = 8080;
app.listen(port, () => {
    console.log("Server listen on port " + port);
});
