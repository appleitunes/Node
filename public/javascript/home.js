window.onload = () => {
    httpCall("getData?select=email&table=ACCOUNT")
    .then((data) => {
        document.getElementById("content").innerHTML = data;
    })
    .catch((error) => {
        document.getElementById("content").innerHTML = error;
    });

    httpCall("insertData");
};

function insertAccount() {
    let keys = ["email", "hashed_pass"];
    let values = ["example@email.com", "87_t4gco8w7nro"];
    let table = "ACCOUNT";

    httpCall("getData?keys=email&table=ACCOUNT")
    .then((data) => {
        if (parseInt(data.status) === 0) {
            throw data.error;
        }
    })
    .catch((error) => {
        alert(error);
    })
}