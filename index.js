const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;

var gameEngine = require("./gameEngine.js");

express()
    .use(express.static(path.join(__dirname, "public")))
    .set("views", path.join(__dirname, "views"))
    .set("view engine", "ejs")
    .get("/", (req, res) => {
        res.sendFile("index.html", { root: __dirname + "/public/Prove1"});
    })
    .get("/", (req, res) => {
        let weight = req.query.weight;
        res.sendFile(`result.ejs?weight=${weight}`, { root: __dirname + "/public/Prove1"});
    })
    .get("/game", gameEngine.playGame)
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));
