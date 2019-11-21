const bcrypt = require("bcryptjs")

function hashPassword(password) {
   bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
         return hash;
      });
   });
}
 
function comparePassowrd(hashPass) {
   bcrypt.compare("B4c0/\/", hashPass, function(err, res) {
       return res;
   });
}

function insertData(req, res) {
   res.writeHead(200, {"content-type":"text/html"});

   let keys = req.query.keys;
   let values = req.query.values;
   let table = req.query.table;

   let sql = `INSERT INTO ${table} (${keys}) VALUES (${values});`;

   pool.query(sql, (err, result) => {
      if (err) {
         res.write("0");
         res.end();
      }
 
      res.write("1");
      res.end();
   });
}