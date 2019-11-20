window.onload = () => {
    httpCall("getPerson")
    .then((data) => {
        document.getElementById("content").innerHTML = data;
    })
    .catch((error) => {
        document.getElementById("content").innerHTML = error;
    });
};