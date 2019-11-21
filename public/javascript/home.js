window.onload = () => {
    getAccount();
    // insertAccount();
};

function getAccount() {
    let keys = "email";
    let table = "ACCOUNT";

    keys = encodeURI(keys);
    table = encodeURI(table);

    httpCall(`getData?keys=${keys}&table=${table}`)
    .then((data) => {
        document.getElementById("content").innerHTML = data;
    })
    .catch((error) => {
        document.getElementById("content").innerHTML = error;
    })
}

// function insertAccount() {
//     let keys = "email, hashed_pass";
//     let values = "'example@email.com', '87_t4gco8w7nro'";
//     let table = "ACCOUNT";

//     keys = encodeURI(keys);
//     values = encodeURI(values);
//     table = encodeURI(table);

//     httpCall(`insertData?keys=${keys}&values=${values}&table=${table}`)
//     .then((data) => {
//         if (parseInt(data.status) === 0) {
//             throw data.error;
//         }
//     })
//     .catch((error) => {
//         alert(error);
//     })
// }