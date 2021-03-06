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
.post("/deleteDeck", deleteDeck)
.post("/createAccount", createAccount)
.post("/login", login)
.listen(app.get("port"), () => {
   console.log("Listening on port: " + app.get("port"));
});

function getDecks(req, res) {
   try {
      let accountID = req.query.account;

      let SQL = `SELECT title, deck_id FROM DECK WHERE owner_account=${accountID};`;

      pool.query(SQL, (err, result) => {
         if (err) {
            throw(err.message);
         }

         res.write(JSON.stringify(result.rows));
         res.end();
      });
   }
   catch(error) {
      res.write(error);
      res.end();
   }
}

function getCards(req, res) {
   try {
      let accountID = req.query.account;

      let SQL = `SELECT * FROM CARD WHERE owner_deck='${accountID}';`;

      pool.query(SQL, (err, result) => {
         if (err) {
            throw(err.message);
         }
         else {
            res.write(JSON.stringify(result.rows));
            res.end();
         }
      });
   }
   catch(error) {
      res.write(error);
      res.end();
   }
}

function deleteDeck(req, res) {
   try {
      let deckID = req.query.id;
      let accountID = req.query.account;

      let SQL = `DELETE FROM CARD WHERE owner_deck='${deckID}';`;

      pool.query(SQL, (err, result) => {
         if (err) {
            throw(err.message);
         }
  
         SQL = `DELETE FROM DECK WHERE deck_id='${deckID}';`;

         pool.query(SQL, (err, result) => {
            if (err) {
               throw(err.message);
            }

            res.write("Done");
            res.end();
         });
      });
   }
   catch(error) {
      res.write(error);
      res.end();
   }
}

function addDeck(req, res) {
   try {
      let userID = req.query.id;
      let title = req.query.title;
      let data = JSON.parse(req.query.data);

      let newID = rand();
      let SQL = `INSERT INTO DECK (deck_id, title, owner_account) VALUES ('${newID}', '${title}', '${userID}');`;

      pool.query(SQL, (err, result) => {
         if (err) {
            throw(`Deck: ${err.message}`);
         }

         addCards(data, newID)
         .then(() => {
            res.write("Done");
            res.end();
         })
         .catch((error) => {
            throw(error);
         });
      });
   }
   catch(error) {
      res.write(error);
      res.end()
   }
}

function addCards(data, deckID) {
   return new Promise((resolve, reject) => {
      try {
         let completeCount = 0;
         let limit = data.length;
         for (i in data) {
            let card = data[i];
            let front = card.front;
            let back = card.back;
            let newID = rand();
            let SQL = `INSERT INTO CARD (card_id, front, back, owner_deck) VALUES ('${newID}', '${front}', '${back}', '${deckID}');`;
            pool.query(SQL, (err, result) => {
               if (err) {
                  throw(`Card: ${err.message}`);
               }
   
               completeCount += 1;

               if (completeCount >= limit - 1) {
                  resolve();
               }
            });
         }
      }
      catch(error) {
         reject(error);
      }
   });
}

function createAccount(req, res) {
   try {
      let email = req.query.email;
      let password = req.query.password;

      let SQL = `INSERT INTO ACCOUNT (email, pass) VALUES ('${email}', '${password}');`;

      pool.query(SQL, (err, result) => {
         if (err) {
            throw(`Card: ${err.message}`);
         }

         login(req, res);
         res.write("Done");
         res.end();
      });
   }
   catch(error) {
      res.write(error);
      res.end();
   }
}

function login(req, res) {
   try {
      let email = req.query.email;
      req.session.user = email;
   }
   catch(error) {
      res.write(error);
      res.end();
   }
}

function rand(length=40) {
   var result = "";
   var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}