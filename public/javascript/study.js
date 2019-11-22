function loadRest() {
    loadDecks(1);
};

function loadDecks(accountID) {
    httpCall("../html/deck.html") 
    .then((template) => {
        getDecks(accountID)
        .then((decks) => {
            if (decks.length !== 0) {
                document.getElementById("list-container").innerHTML = "";
                for (i in decks) {
                    let newDeck = decks[i];
                    let templateCopy = template.replace("$title", newDeck.title);
                    templateCopy = templateCopy.replace("$deckID", newDeck.deck_id);
                    document.getElementById("list-container").innerHTML += templateCopy;
                }
            }
            else {
                document.getElementById("list-container").innerHTML = "There are no Decks assigned to this account.";
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
        httpCall(`getCards?account=${deckID}`, "POST")
        .then((result) => {
            resolve(JSON.parse(result));
        })
        .catch((error) => {
            reject(error);
        })
    });
}