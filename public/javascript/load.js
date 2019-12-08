window.onload = () => {
    document.body.style.minHeight = window.screen.availHeight + "px";

    httpCall("../html/nav.html")
    .then((template) => {
        document.getElementById("navbar").innerHTML = template;
    });

    if (typeof loadRest !== "undefined") { 
        loadRest();
    }
};