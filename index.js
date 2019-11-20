const express = require("express");
const calculateRate = require('./functions/calculateRate.js');
var app = express();

const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://qkoefgxxlcvrpi:c10a493d57075b82c1d9b6ed226a83a30ba80cd59b2a94fb2055e38d7cff557c@ec2-174-129-253-162.compute-1.amazonaws.com:5432/dehq73vk2n1uod?ssl=true";
const pool = new Pool({connectionString: connectionString});

app.set("port", process.env.PORT || 5000)
   .use(express.static(__dirname + "/public"))
   .set("views", __dirname + "/views")
   .get("/", (req, res) => {
      res.sendFile("home.html", { root: __dirname + "/public"});
   })
   .get("/getRate", calculateRate.calculateRate)
   .get("/getPerson", (req, res) => {
      let sql = "SELECT * FROM PERSON;";
      pool.query(sql, (err, result) => {
         let string = JSON.stringify(result);
         res.write(string.rows);
         res.end();
      });  
   })
   .listen(app.get("port"), () => {
      console.log("Listening on port: " + app.get("port"));
   })
