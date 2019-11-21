const express = require("express");
const app = express();
app.use(express.static(__dirname + "/public"));

const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://qkoefgxxlcvrpi:c10a493d57075b82c1d9b6ed226a83a30ba80cd59b2a94fb2055e38d7cff557c@ec2-174-129-253-162.compute-1.amazonaws.com:5432/dehq73vk2n1uod?ssl=true";
const pool = new Pool({connectionString: connectionString});

app.set("port", process.env.PORT || 5000)
.use(express.static(__dirname + "/public"))
.get("/", (req, res) => {
   res.sendFile("home.html", { root: __dirname + "/public"});
})
.post("/getDecks", getDecks)
.post("/getCards", getCards)
.listen(app.get("port"), () => {
   console.log("Listening on port: " + app.get("port"));
});

function getDecks(req, res) {
   let accountID = req.query.account;

   let sql = `SELECT * FROM DECK WHERE owner_account=${accountID}`;

   pool.query(sql, (err, result) => {
      if (err) {
         res.write("0");
         res.end();
      }
 
      res.write(JSON.stringify(result.rows));
      res.end();
   });
}

function getCards(req, res) {
   let deckID = req.query.deck;

   let sql = `SELECT * FROM CARD WHERE owner_deck=${deckID};`;

   pool.query(sql, (err, result) => {
      if (err) {
         res.write("0");
         res.end();
      }
 
      res.write(result);
      res.end();
   });
}