var id = 1;
var deckID;

function loadRest() {
    let urlParams = new URLSearchParams(window.location.search);
    let title = urlParams.get("title");
    deckID = urlParams.get("deck");

    if (deckID) {
        document.getElementById("input-title").value = title;

        getCards(deckID)
        .then((result) => {
            for (i in result) {
                let card = result[i];
                addCard(card.front, card.back);
            }
        })
        .catch((error) => {
            alert(error);
        });
    }

}

function setCard(card) {
    let element = card;

    if (element.addEventListener) {
        element.addEventListener("keyup", () => {
            element.style.height = "";
            element.style.height = element.scrollHeight + "px";
        });

        element.parentElement.addEventListener("click", () => {
            element.focus();
        });
    }
}

function addCard(front="", back="") {
    let newCard = createCard(front, back);
    document.getElementById("cards-container").appendChild(newCard);
}

function deleteCard(card) {
    card.parentElement.removeChild(card);
}

function createCard(front="", back="") {
    let newRow = document.createElement("li");
    newRow.className = "row";

    let newDelete = document.createElement("div");
    newDelete.className = "delete";
    newDelete.innerText = "X";
    newDelete.onclick = () => { deleteCard(newRow); }
    newRow.appendChild(newDelete);

    let newFront = document.createElement("div");
    newFront.className = "card";
    let newTextArea = document.createElement("textarea");
    newTextArea.className = "text";
    newTextArea.placeholder = "FRONT";
    newTextArea.maxLength = "40";
    newTextArea.value = front;
    newFront.appendChild(newTextArea);
    setCard(newTextArea);
    newRow.appendChild(newFront);

    let newBack = document.createElement("div");
    newBack.className = "card";
    newTextArea = document.createElement("textarea");
    newTextArea.className = "text";
    newTextArea.placeholder = "BACK";
    newTextArea.maxLength = "40";
    newTextArea.value = back;
    newBack.appendChild(newTextArea);
    setCard(newTextArea);
    newRow.appendChild(newBack);

    return newRow;
}

function saveCards() {
    let rawData = getCardData();
    let title = rawData.title;
    let data = decodeURI(JSON.stringify(rawData.data));

    let url = `addDeck?id=${id}&title=${title}&data=${data}`;

    if (deckID) {
        deleteDeck(deckID)
        .then(() => {
            httpCall(url, "POST")
            .then((result) => {
                alert(result);
                document.location.href = "/";
            })
            .catch((error) => {
                alert(error);
            });
        })
        .catch((error) => {
            alert(error);
        });
    }
    else {
        deleteDeck(deckID)
        .then(() => {
            httpCall(url, "POST")
            .then((result) => {
                alert(result);
                document.location.href = "/";
            })
            .catch((error) => {
                alert(error);
            });
        });
    }
}

function getCardData() {
    let container = document.getElementById("cards-container");
    let inputs = container.getElementsByClassName("text");

    let data = [];

    for (let i = 0; i < inputs.length; i += 2) {
        data.push({
            front: inputs[i].value,
            back: inputs[i + 1].value
        });
    }

    let title = document.getElementById("input-title").value;

    return {
        title: title,
        data: data
    }
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

function deleteDeck(cardID) {
    return new Promise((resolve, reject) => {
        httpCall(`deleteDeck?id=${cardID}&account=${id}`, "POST")
        .then((result) => {
            resolve();
        })
        .catch((error) => {
            reject(error);
        });
    });
}