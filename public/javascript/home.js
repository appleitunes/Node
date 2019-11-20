window.onload = () => {
    httpCall("/getPerson")
    .then((data) => {
        document.getElementById("content").innerHTML = data;
    });
};