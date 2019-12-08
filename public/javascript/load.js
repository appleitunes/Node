window.onload = () => {
    document.body.style.minHeight = window.screen.availHeight + "px";
    
    httpCall("../html/nav.html")
    .then((template) => {
        document.getElementById("navbar").innerHTML = template;
    });

    httpCall("../html/footer.html")
    .then((template) => {
        document.getElementById("footer-content").innerHTML = template;
    });

    if (typeof loadRest !== "undefined") { 
        loadRest();
    }
};