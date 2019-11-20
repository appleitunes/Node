window.onload = () => {
    httpCall("getPerson?select=email&table=ACCOUNT")
    .then((data) => {
        document.getElementById("content").innerHTML = data;
    })
    .catch((error) => {
        document.getElementById("content").innerHTML = error;
    });
};