function loadRest() {
    const urlParams = new URLSearchParams(window.location.search);
    const data = JSON.parse(urlParams.get("data"));
    const title = urlParams.get("title");

    startDeck(data, title);
}