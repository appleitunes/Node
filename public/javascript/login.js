function login() {
    let username = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let url = `createAccount?username=${username}&password=${password}`;

    httpCall(url)
    .then((result) => {
        alert(result);
    })
    .catch((error) => {
        alert(error);
    });
}