window.onload = () => {
    getDecks(1)
    .then((result) => {
        alert(JSON.stringify(result));
    });
};

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
        httpCall(`getDecks?account=${deckID}`)
        .then((result) => {
            resolve(JSON.parse(result));
        })
        .catch((error) => {
            reject(error);
        })
    });
}