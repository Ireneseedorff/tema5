document.addEventListener("DOMContentLoaded", sidenVises);


function sidenVises() {
    console.log("siden vises");
    // registrer klik på menuknap
    document.querySelector(".menu-button").addEventListener("click", toggleMenu);
}

function toggleMenu() {
    console.log("Toggle menu");
    document.querySelector("#menu").classList.toggle("hide");

    let erSkjult = document.querySelector("#menu").classList.contains("hide")

    if (erSkjult == true) {
        //menuen er skjult - ændr menuknap til lll
        document.querySelector(".menu-button img").src = "materiale/burger.png";
    } else {
        //menuen er nu vist - ændr menuknap til X
        document.querySelector(".menu-button img").src = "materiale/cancel.png";
    }
}

//BURGERMENU SLUT