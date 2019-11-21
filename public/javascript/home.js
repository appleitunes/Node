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