const express = require("express");
// const bcrypt = require("bcrypt");
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
   res.header("Content-Type",'application/json');

   let keys = JSON.parse(req.query.keys);
   let table = req.query.table;

   let sql = `SELECT ${keys.join(',')} FROM ${table};`;
   pool.query(sql, (err, result) => {
      if (err) {
         res.write({
            status: 0,
            data: "",
            error: err
         });
         res.end();
      }
 
      let JSONData = JSON.stringify(result.rows);
      res.write({
         status: 1,
         data: JSONData,
         error: ""
      });
      res.end();
   });
}

function insertData(req, res) {
   res.header("Content-Type",'application/json');

   let keys = JSON.parse(req.query.keys);
   let values = JSON.parse(req.query.data);
   let table = req.query.table;

   for (i in data) {
      let val = data[i];
      if (isNaN(val)) {
         data[i] = "'" + val + "'";
      }
   }

   let sql = `INSERT INTO ${table} (${keys.join(',')}) VALUES (${values.join(',')});`;
   pool.query(sql, (err, result) => {
      if (err) {
         res.write({
            status: 0,
            error: err
         });
         res.end();
      }

      res.write({
         status: 1,
         error: err
      });
      res.end();
   });
}