var cardTemplate;

function loadRest() {
    setCards();

    httpCall("../html/card.html")
    .then((template) => {
        cardTemplate = template;
    });
}

function setCards(card=null) {
    if (!card) {
        let textAreas = document.getElementsByClassName("text");
    
        for (i in textAreas) {
            let element = textAreas[i];
    
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
    }
}

function addCard() {
    document.getElementById("cards-container").innerHTML += cardTemplate;
    let newCard = document.getElementsByClassName("text");
    setCards(newCard[newCard.length - 1]);
}

function deleteCard(card) {
    card.parentElement.parentElement.removeChild(card.parentElement);
}