function loadRest() {
    loadDecks(1);
};

function loadDecks(accountID) {
    httpCall("../html/deck.html") 
    .then((template) => {
        getDecks(accountID)
        .then((decks) => {
            document.getElementById("list-container").innerHTML = "";
            for (i in decks) {
                let newDeck = decks[i];
                let templateCopy = template.replace("$title", newDeck.title);
                templateCopy = template.replace("$deckID", newDeck.deck_id);
                document.getElementById("list-container").innerHTML += templateCopy;
            }
        })
        .catch((error) => {
            document.getElementById("list-container").innerHTML = error;
        });
    });
}

function loadCards(deckID) {
    getCards(deckID)
    .then((cards) => {
        alert(JSON.stringify(cards));
    })
    .catch((error) => {
        alert(error);
    })
}

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