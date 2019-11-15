const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;

express()
    .use(express.static(path.join(__dirname, "public")))
    .set("views", path.join(__dirname, "views"))
    .set("view engine", "ejs")
    .get("/", (req, res) => {
        res.sendFile("index.html", { root: __dirname + "/public/Prove1"});
    })
    .get("/calc", (req, res) => {
        res.sendFile("index.html", { root: __dirname + "/public/Prove1"});
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));
