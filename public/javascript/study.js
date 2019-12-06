var id = 1;

function loadRest() {
    loadDecks(id);
};

function loadDecks(accountID) {
    document.getElementById("list-container").innerHTML = "";

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
                document.getElementById("list-container").appendChild(createCard(title, id));
            }
        }
    })
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
        httpCall(`getDecks?account=${accountID}`)
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
        httpCall(`getCards?account=${deckID}`)
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

function deleteCard(cardID, element) {
    httpCall(`deleteDeck?id=${cardID}&account=${id}`, "POST")
    .then((result) => {
        element.parentElement.removeChild(element);
    })
    .catch((error) => {
        alert(error);
    });
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
    newOptions.appendChild(newStudy);

    // Create edit option
    let newEdit = document.createElement("img");
    newEdit.src = "images/icons/edit.png";
    newEdit.onclick = () => { editCard(cardID); };
    newOptions.appendChild(newEdit);

    // Create delete option
    let newDelete = document.createElement("img");
    newDelete.src = "images/icons/delete.png";
    newDelete.onclick = () => { deleteCard(cardID, newContainer); };
    newOptions.appendChild(newDelete);

    return newContainer;
}