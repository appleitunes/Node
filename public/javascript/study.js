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
                    let title = newDeck.title;
                    let id = newDeck.deck_id;
                    document.getElementById("list_container").appendChild(createCard(title, id));
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
        document.location.href = `quiz.html?data=${data}&title=${title}`;
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

function editCard(cardID) {
    alert(cardID);
}

function createCard(title, cardID) {
    // Create container
    let newContainer = document.createElement("div");
    newContainer.className = "item-container";

    // Create card
    let newCard = document.createElement("div");
    newCard.className = "item";
    newContainer.appendChild(newCard);

    // Create title
    let newTitle = document.createElement("h1");
    newTitle.innerText = title;
    newCard.appendChild(newTitle);

    // Create options container
    let newOptions = document.createElement("div");
    newOptions.className = "options";
    newCard.appendChild(newOptions);

    // Create study option
    let newStudy = document.createElement("img");
    newStudy.src = "images/icons/study.png";
    newStudy.onclick = () => { loadCards(cardID, title); };

    return newContainer;
}