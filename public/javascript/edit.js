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
    document.getElementById("cards-container").appendChild(createCard());
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
    // setCard(newBack);
    newBack.appendChild(newTextArea);
    newRow.appendChild(newBack);

    return newRow;
}