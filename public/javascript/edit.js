function loadRest() {
    // setCards();
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

function addCard() {
    let newCard = createCard();
    document.getElementById("cards-container").appendChild(newCard);
}

function deleteCard(card) {
    card.parentElement.removeChild(card);
}

function createCard() {
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
    newFront.appendChild(newTextArea);
    setCard(newTextArea);
    newRow.appendChild(newFront);

    let newBack = document.createElement("div");
    newBack.className = "card";
    newTextArea = document.createElement("textarea");
    newTextArea.className = "text";
    newTextArea.placeholder = "BACK";
    newBack.appendChild(newTextArea);
    setCard(newTextArea);
    newRow.appendChild(newBack);

    return newRow;
}

function saveCards() {
    let rawData = getCardData();
    let title = rawData.title;
    let data = decodeURI(JSON.stringify(rawData.data));

    let url = `addDeck?title=${title}&data=${data}`;

    httpCall(url, "POST")
    .then((result) => {
        alert(result);
    });
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