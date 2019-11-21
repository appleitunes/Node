const express = require("express");
var app = express();
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
   let select = req.query.select;
   let table = req.query.table;

   res.header("Content-Type",'application/json');
   let sql = `SELECT ${select} FROM ${table};`;
   pool.query(sql, (err, result) => {
      let JSONData = JSON.stringify(result.rows);
      res.write(JSONData);
      res.end();
   });
}

function insertData(req, res) {
   // let keys = JSON.parse(req.query.keys);
   // let data = JSON.parse(req.query.data);
   // let table = req.query.table;

   // let sql = `INSERT INTO ACCOUNT (${keys.join(',')}) VALUES (${data.join(',')});`;

   let sql = `INSERT INTO ACCOUNT (email,hashed_pass) VALUES ('shanedavenport15@gmail.com','7tbew986aygfnoausygf');`;
   pool.query(sql, (err, result) => {
      let string = JSON.stringify(result.rows);
      res.write(string);
      res.end();
   });
}