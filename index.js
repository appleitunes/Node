const express = require("express");
var app = express();

app.set("port", process.env.PORT || 5000)
   .use(express.static(__dirname + "/public"))
   .set("views", __dirname + "/views")
   .set("view engine", "ejs")
   .get("/", function(req, res){
      res.sendFile("form.ejs", { root: __dirname + "/public"});
   })
   .get("/game", function(req, res) {
      var player = req.query.player_choice;
      var username = req.query.username;
      var cpu = "rock";
      var winner = username;
      var stuff = {player: player, cpu: cpu, winner: winner};
      res.render('results', stuff);
   })
   .listen(app.get("port"), function() {
      console.log("Listening on port: " + app.get("port"));
   })
