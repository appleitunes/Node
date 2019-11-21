window.onload = () => {
    getDecks(1);
};

function getDecks(accountID) {
    return new Promise((resolve, reject) => {
        httpCall(`getDecks?account=${accountID}`)
        .then((result) => {
            result = JSON.parse(result);
            createCard(result["title"], result["account_id"]);
        })
        .catch((error) => {
            document.getElementById("content").innerHTML = error;
        })
    });
}

function createCard(title, id) {
    let innerHTML = `<div class='card' onclick(alert(${id}))>`;
    innerHTML += title;
    innerHTML += "</div>";

    document.getElementById("content").innerHTML += innerHTML;
}