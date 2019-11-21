window.onload = () => {
    getAccount();
    // insertAccount();
};

function getAccount() {
    let keys = ["email"];
    let table = "ACCOUNT";

    keys = encodeURI(JSON.stringify(keys));

    httpCall(`getData?keys=${keys}&table=${table}`)
    .then((data) => {
        if (parseInt(data.status) === 0) {
            throw data.error;
        }
        else {
            document.getElementById("content").innerHTML = data.data;
        }
    })
    .catch((error) => {
        document.getElementById("content").innerHTML = error;
    });
}

function insertAccount() {
    let keys = ["email", "hashed_pass"];
    let values = ["example@email.com", "87_t4gco8w7nro"];
    let table = "ACCOUNT";

    keys = encodeURI(JSON.stringify(keys));
    values = encodeURI(JSON.stringify(values));

    httpCall(`insertData?keys=${JSON.stringify(keys)}&values=${JSON.stringify(values)}&table=${table}`)
    .then((data) => {
        if (parseInt(data.status) === 0) {
            throw data.error;
        }
    })
    .catch((error) => {
        alert(error);
    })
}