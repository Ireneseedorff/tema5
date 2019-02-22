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
        document.querySelector(".menu-button img").src = "materiale/sortburger.png";
    } else {
        //menuen er nu vist - ændr menuknap til X
        document.querySelector(".menu-button img").src = "materiale/crosssort.png";
    }
}

//BURGERMENU SLUT

//MENU- OG FILTRERINGSSEKTION
        let alleRetter = [];
        let filter = "alle";


        document.addEventListener("DOMContentLoaded", start);


        function start() {
            let dest = document.querySelector("#liste");

            async function getJson() {
                let jsonData = await fetch("https://mandalskeawebspace.dk/claude_php/clean_up_spreadsheet.php?id=1l94dBfaWqqmgz6Dwoxwh3YBV9PEFDsUnnh1A6TPIzbw");
                alleRetter = await jsonData.json();
               
                visRetter();
            }

            function visRetter() {
                console.log("VIS RETTER");
                dest.innerHTML = "";
                alleRetter.forEach(ret => {
                    //console.log(ret.titel)
                    if (filter == "alle" || filter == ret.kategori) {
                            
                        let template = `
                            <article class="ret">
                            <img src="elfresco_mad/${ret.billede}.jpg" alt="${ret.titel}">
                            <h2>${ret.titel}</h2>
                            </article>
                            `;
                        dest.insertAdjacentHTML("beforeend", template);
                        dest.lastElementChild.addEventListener("click", åbn);

                        function åbn() {
                            document.querySelector("#indhold").innerHTML = `
                         <article class="ret">
                    <img src="elfresco_mad/${ret.billede}.jpg" alt="${ret.titel}">
                    <h2>${ret.titel}</h2>
            <p>${ret.kortbeskrivelse}</p>
                <p>Pris: ${ret.pris},-</p>
                    </article>
                    `;
                            document.querySelector("#popup").style.display = "block";
                        }
                    }

                })
            } //function visPersoner slut
            document.querySelector("#luk button").addEventListener("click", () => {
                document.querySelector("#popup").style.display = "none";
            })
            document.querySelectorAll(".filter").forEach(elm => {
                elm.addEventListener("click", filtrering);
            })

            function filtrering() {
                filter = this.getAttribute("data-kategori");
                console.log("FILTER",filter);
//                document.querySelector("h2").textContent = this.textContent;
                document.querySelectorAll(".filter").forEach(elm => {
                    elm.classList.remove("valgt");
                })
                this.classList.add("valgt");
                visRetter();
            }

            getJson();
        }