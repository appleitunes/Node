window.onload = () => {
    getDecks(1);
};

function getDecks(accountID) {
    return new Promise((resolve, reject) => {
        httpCall(`getCards?account=${accountID}`)
        .then((result) => {
            document.getElementById("content").innerHTML = result;
        })
        .catch((error) => {
            document.getElementById("content").innerHTML = error;
        })
    });
}