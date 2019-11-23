class Deck {
    constructor(data, resolve) {
        this.front = data[0].sourceLang;
        this.back = data[0].targetLang;
        this.data = data;
        this.index = 0;
        this.resolve = resolve;
        this.disabled = false;
        this.active = true;

        this.objects = {
            container: document.getElementById("card_container"),
            card: document.getElementById("note_card"),
            text: document.getElementById("note_title"),
            input: document.getElementById("note_text"),
            submit: document.getElementById("note_submit")
        };

        this.objects.submit.onclick = () => {
            this.submitAnswer();
        };
        this.objects.input.addEventListener("keypress", (event) => {
            if (event.keyCode == 13) {
                this.submitAnswer();
            }
        });

        this.moveCenter();
        this.loadNext();
        this.objects.input.focus();
    }

    // Handle the card upon the user submitting his or her answer
    submitAnswer() {
        if (!this.disabled) {
            let correctAnswer = this.back;
            let isCorrect = compare(this.objects.input.value, correctAnswer);
            this.objects.input.value = correctAnswer;
            this.objects.input.disabled = true;
            this.disabled = true;
            this.flip(isCorrect);

            window.setTimeout(() => {
                if (isCorrect) {
                    this.moveOffscreen(false, isCorrect);
                }
                else {
                    this.moveOffscreen(true, isCorrect);
                }
            }, 1250);
        }
    }

    // Load the next prompt in the deck
    loadNext(isCorrect=false) {
        let currCard = this.data[this.index];

        if (this.active) {

            if (isCorrect) {
                currCard["state"]++;

                if (currCard["state"] == 4) {
                    this.data.splice(this.index, this.index + 1);
                }
            }
            else if (2 <= currCard["state"]) {
                currCard["state"] -= 2;
            }

            // Select the next card in the index
            this.index = (this.index + 1) % this.data.length;
            currCard = this.data[this.index];

            if (currCard) {
                let state = currCard["state"];

                // Alternate which word is on the front
                if (state % 2 == 0) {
                    this.front = currCard.front;
                    this.back = currCard.back;
                }
                else {
                    this.front = currCard.back;
                    this.back = currCard.front;
                }

                // Give a hint if needed
                if (state < 2) {
                    this.objects.input.placeholder = this.back;
                }
                else {
                    this.objects.input.placeholder = "";
                }
            }
            else {
                this.resolve();
            }

            this.objects.text.innerText = this.front;
        }
    }

    // Turn the card over to the other side
    flip(isCorrect) {
        // Flatten card
        let width = ((this.objects.container.offsetWidth / 2) - (this.objects.card.offsetWidth / 2)).toString() + "px";
        this.objects.card.style.transition = "0.15s";
        this.objects.card.style.width = "0";
        this.objects.card.style.left = (this.objects.container.offsetWidth / 2).toString() + "px";
        this.objects.text.innerText = "";

        // Expand card's width back to normal
        window.setTimeout(() => {
            this.objects.text.innerText = this.back;
            this.objects.card.style.backgroundColor = isCorrect ? "green" : "red";

            this.objects.card.style.width = "20em";
            this.objects.card.style.left = width;
        }, 150);
    }

    // Move the card object to the center of the container
    moveCenter() {
        this.objects.card.style.transition = "0s";
        this.objects.card.style.left = (-this.objects.container.offsetWidth / 2) + "px";

        // Timeout to give card time to move offscreen
        window.setTimeout(() => {
            this.objects.card.style.transition = "0.15s";
            this.objects.card.style.left = ((this.objects.container.offsetWidth / 2) - (this.objects.card.offsetWidth / 2)).toString() + "px";
            this.objects.card.style.backgroundColor = "rgb(77, 170, 210)";

            // Enable input
            this.objects.input.disabled = false;
            this.disabled = false;
            this.objects.input.focus();
        }, 10);
    }

    // Move the card object offscreen
    moveOffscreen(left=false, isCorrect=false) {
        let position = left ? (-this.objects.container.offsetWidth / 2) + "px" : (this.objects.container.offsetWidth).toString() + "px"; 
        this.objects.card.style.left = position;

        window.setTimeout(() => {
            this.moveCenter();
            this.objects.input.value = "";
            this.loadNext(isCorrect);
        }, 500);
    }
}

function compare(string1, string2) {
    let correctLetters = 0;

    string1 = string1.toLowerCase();
    string2 = string2.toLowerCase();

    for (let i = 0; i < Math.min(string1.length, string2.length); i++) {
        if (string1[i] == string2[i]) {
            correctLetters++;
        }
    }

    return 0.75 <= correctLetters / Math.min(string1.length, string2.length);
}

function startDeck(data, title) {
    for (i in data) {
        let card = data[i];
        card.state = 0;
    }

    let deck;
    new Promise((resolve) => {
        deck = new Deck(data, resolve);
        document.getElementById("deck_title").innerText = title;
    })
    .then(() => {
        deck.active = false;
        document.location.href = `study.html`;
    });
}