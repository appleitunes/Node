window.onload = () => {
    getAccount("email", "ACCOUNT", "account_id=1");
    insertAccount("email, hashed_pass", "'example@email.com', '87_t4gco8w7nro'", "ACCOUNT");
};

function getAccount(keys, table, conditions) {
    getData(keys, table, conditions)
    .then((result) => {
        document.getElementById("content").innerHTML = result;
    })
    .catch((error) => {
        document.getElementById("content").innerHTML = error;
    });
}

function insertAccount(keys, values, table) {
    insertData(keys, values, table)
    .then((result) => {
        alert(result);
    })
    .catch((error) => {
        alert(error);
    });
}