const express = require("express");
const app = express();

const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://qkoefgxxlcvrpi:c10a493d57075b82c1d9b6ed226a83a30ba80cd59b2a94fb2055e38d7cff557c@ec2-174-129-253-162.compute-1.amazonaws.com:5432/dehq73vk2n1uod?ssl=true";
const pool = new Pool({connectionString: connectionString});

app.set("port", process.env.PORT || 5000)
.use(express.static(__dirname + "/public"))
.get("/", (req, res) => {
   res.sendFile("study.html", { root: __dirname + "/public"});
})
.get("/getDecks", getDecks)
.get("/getCards", getCards)
.post("/addDeck", addDeck)
.listen(app.get("port"), () => {
   console.log("Listening on port: " + app.get("port"));
});

function getDecks(req, res) {
   let accountID = req.query.account;

   let SQL = `SELECT title, deck_id FROM DECK WHERE owner_account=${accountID};`;

   pool.query(SQL, (err, result) => {
      if (err) {
         res.write("0");
         res.end();
      }
      else {
         res.write(JSON.stringify(result.rows));
         res.end();
      }
   });
}

function getCards(req, res) {
   let deckID = req.query.account;

   let SQL = `SELECT * FROM CARD WHERE owner_deck=${deckID};`;

   pool.query(SQL, (err, result) => {
      if (err) {
         res.write("0");
         res.end();
      }
      else {
         res.write(JSON.stringify(result.rows));
         res.end();
      }
   });
}

function addDeck(req, res) {
   let userID = req.query.id;
   let title = req.query.title;
   let data = JSON.parse(req.query.data);

   let SQL = `INSERT INTO DECK (title, owner_account) VALUES ('${title}', ${userID});`;

   pool.query(SQL, (err, result) => {
      if (err) {
         res.write(err.message);
         res.end();
      }
      else {
         addCards(data, result.insertId)
         .then(() => {
            res.write(1);
            res.end();
         })
         .catch((error) => {
            res.write(error);
            res.end();
         });
      }
   });
}

function addCards(data, deckID) {
   let completeCount = 0;
   let limit = data.length;

   return new Promise((resolve, reject) => {
      for (i in data) {
         let front = i;
         let back = data[i];
         let SQL = `INSERT INTO CARD (front, back, owner_deck) VALUES ('${front}', '${back}', ${deckID});`;
         pool.query(SQL, (err, result) => {
            if (err) {
               reject(err.message);
            }
            else {
               completeCount += 1;

               if (completeCount >= limit - 1) {
                  resolve();
               }
            }
         });
      }
   });
}