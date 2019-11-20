

function getPerson(req, res) {
    const connectionString = process.env.DATABASE_URL || "postgres://qkoefgxxlcvrpi:c10a493d57075b82c1d9b6ed226a83a30ba80cd59b2a94fb2055e38d7cff557c@ec2-174-129-253-162.compute-1.amazonaws.com:5432/dehq73vk2n1uod?ssl=true";
    const pool = new Pool({connectionString: connectionString});
    var sql = "SELECT * FROM some_table_here";
    res.write("Hello, World!");
    res.end();
}

module.exports = {getPerson: getPerson};