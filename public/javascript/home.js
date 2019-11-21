window.onload = () => {
    getAccount();
    // insertAccount();
};

function getAccount() {
    httpCall("getData?select=email&table=ACCOUNT")
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

    httpCall(`getData?keys=${JSON.stringify(keys)}&values=${JSON.stringify(values)}&table=${table}`)
    .then((data) => {
        if (parseInt(data.status) === 0) {
            throw data.error;
        }
    })
    .catch((error) => {
        alert(error);
    })
}