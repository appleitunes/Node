function loadRest() {
    httpCall("../html/deck.html") 
    .then((template) => {
        getDecks(1)
        .then((decks) => {
            document.getElementById("list-container").innerHTML = "";
            for (i in decks) {
                let newDeck = decks[i];
                let templateCopy = template.replace("$title", newDeck.title);
                document.getElementById("list-container").innerHTML += templateCopy;
            }
        });
    });
};

function getDecks(accountID) {
    return new Promise((resolve, reject) => {
        httpCall(`getDecks?account=${accountID}`, "POST")
        .then((result) => {
            resolve(JSON.parse(result));
        })
        .catch((error) => {
            reject(error);
        })
    });
}

function getCards(deckID) {
    return new Promise((resolve, reject) => {
        httpCall(`getDecks?account=${deckID}`, "POST")
        .then((result) => {
            resolve(JSON.parse(result));
        })
        .catch((error) => {
            reject(error);
        })
    });
}