const express = require("express");
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
.get("/getPerson", getPerson)
.listen(app.get("port"), () => {
   console.log("Listening on port: " + app.get("port"));
})

function getPerson(req, res) {
   res.header("Content-Type",'application/json');
   let sql = "SELECT * FROM PERSON;";
   pool.query(sql, (err, result) => {
      let string = JSON.stringify(result.rows);
      res.write(string);
      res.end();
   });  
}