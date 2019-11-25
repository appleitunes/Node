var cardTemplate;

function loadRest() {
    setCards();

    httpCall("../html/card.html")
    .then((template) => {
        cardTemplate = template;
    });
}

function setCards() {
    let textareas = document.getElementsByClassName("text");
   
    for (i in textareas) {
        let element = textareas[i];
 
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

function addCard() {
    document.getElementById("cards-container").innerHTML += cardTemplate;
    setCards();
}

function deleteCard(card) {
    card.parentElement.parentElement.removeChild(card.parentElement);
}