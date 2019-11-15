const express = require("express");
var app = express();

app.set("port", process.env.PORT || 5000)
   .use(express.static(__dirname + "/public"))
   .set("views", __dirname + "/views")
   .set("view engine", "ejs")
   .get("/", function(req, res) {
      res.sendFile("home.html", { root: __dirname + "/public/Prove9"});
   })
   .get("/test", function(req, res) {
        res.render("test");
   })
   .listen(app.get("port"), function() {
      console.log("Listening on port: " + app.get("port"));
   });