function loadRest() {
    loadDecks(1);
};

function loadDecks(accountID) {
    httpCall("../html/deck.html") 
    .then((template) => {
        getDecks(accountID)
        .then((decks) => {
            if (decks.length < 1) {
                document.getElementById("list-container").innerHTML = "There are no Decks assigned to this account.";
            }
            else {
                document.getElementById("list-container").innerHTML = "";
                for (i in decks) {
                    let newDeck = decks[i];
                    let templateCopy = template.replace("$title1", newDeck.title);
                    templateCopy = templateCopy.replace("$title2", newDeck.title);
                    templateCopy = templateCopy.replace("$deckID", newDeck.deck_id);
                    document.getElementById("list-container").innerHTML += templateCopy;
                }
            }
        })
        .catch((error) => {
            document.getElementById("list-container").innerHTML = error;
        });
    });
}

function loadCards(deckID, title) {
    getCards(deckID)
    .then((cards) => {
        const data = encodeURI(JSON.stringify(cards));
        document.URL = `study.html?data=${data}&title=${title}`;
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