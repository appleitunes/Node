const express = require("express");
const app = express();
app.use(express.static(__dirname + '/public'));

const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://qkoefgxxlcvrpi:c10a493d57075b82c1d9b6ed226a83a30ba80cd59b2a94fb2055e38d7cff557c@ec2-174-129-253-162.compute-1.amazonaws.com:5432/dehq73vk2n1uod?ssl=true";
const pool = new Pool({connectionString: connectionString});

app.set("port", process.env.PORT || 5000)
.use(express.static(__dirname + "/public"))
.get("/", (req, res) => {
   res.sendFile("home.html", { root: __dirname + "/public"});
})
.post("/getData", getData)
.post("/insertData", insertData)
.listen(app.get("port"), () => {
   console.log("Listening on port: " + app.get("port"));
});

function getData(req, res) {
   res.header("Content-Type","application/json");

   let keys = req.query.keys;
   let table = req.query.table;

   let sql = `SELECT ${keys} FROM ${table};`;

   pool.query(sql, (err, result) => {
      if (err) {
         res.write(err);
         res.end();
      }
 
      let JSONData = JSON.stringify(result.rows);
      res.write(JSONData);
      res.end();
   });
}

function insertData(req, res) {
   res.writeHead(200, {"content-type":"text/html"});

   let keys = req.query.keys;
   let values = req.query.values;
   let table = req.query.table;

   let sql = `INSERT INTO ${table} (${keys}) VALUES (${values});`;

   pool.getConnection(sql, (err, conn) => {
      if (err) {
         res.write("0");
         res.end();
      }
 
      res.write("1");
      res.end();
   });
}