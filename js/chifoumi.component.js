class ChifoumiElement extends HTMLElement {
    constructor() {
        super();
        this._scoreJoueur = 0;
        this._scoreOrdi = 0;
    }

    get scoreJoueur() {
        return this._scoreJoueur;
    }
    set scoreJoueur(score) {
        this._scoreJoueur = score;
    }

    get scoreOrdi(){
        return this._scoreOrdi;
    }
    set scoreOrdi(score){
        this._scoreOrdi = score;
    }

    get style() {
        return `
        <style>
            *{
                font-size: 12px;
                margin: 0.2em;
                padding: 0.2em;
            }
            #chifoumi-container{
                display: flex;
                flex-direction: column;
                width: 200px;
            }
        </style>`;
    }

    connectedCallback() {
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
        <section id="chifoumi-container">
            <section id="choixJoueur">
                <input type="button" value="Pi" id="btnPierre" class="small-button">
                <input type="button" value="Pa" id="btnPapier" class="small-button">
                <input type="button" value="Ci" id="btnCiseaux" class="small-button">
            </section>
            <section id="imgChoix">
                <img src="#" alt="choix Joueur" id="imgChoixJoueur">
                <img src="#" alt="choixOrdi" id="imgChoixOrdi">
            </section>           
            <section id="scores">
                Joueur <span id="scoreJoueur"></span> : <span id="scoreOrdi"></span> Ordi
            </section>
            <input type="button" value="rejouer" id="btnRejouer">
        </section>
        ${this.style}`;
    }


    /**
     * Renvoie un nombre aléatoire 0, 1 ou 2
     * @returns 0, 1 ou 2
     */
    static choixRandom = () => {
        return Math.floor(Math.random() * 3);
    }

    static choixOrdi = () => {
        const choixChifoumi = ['pierre', 'papier', 'ciseaux'];
        return choixChifoumi[choixRandom()];
    }

    static chifoumi = (choixJ1, choixJ2) => {
        const win = {
            "pierre" : "ciseaux",
            "papier" : "pierre",
            "ciseaux" : "papier"
        }
    
        if(choixJ2 == win[choixJ1]) return 1;
        if(choixJ1 == win[choixJ2]) return 2;
        return 0;
    
    }

    static _btnClick = (event) => {
        const idOfElement = event.target.getAttribute("id");
        const imageJoueur1 = document.querySelector("#imgChoixJoueur");
        const imageOrdi = document.querySelector("#imgChoixOrdi");
    
        let choixJoueur = "";
        switch(idOfElement){
            case "btnPierre":
                choixJoueur = "pierre";
                //imageJoueur1.src = imagePierre;
                break;
            case "btnPapier":
                choixJoueur = "papier";
                //imageJoueur1.src = imagePapier;
                break;
            case "btnCiseaux":
                choixJoueur = "ciseaux";
                //imageJoueur1.src = imageCiseaux;
                break;
        }
        
        const choixOrdinateur = choixOrdi();
    
        // switch(choixOrdinateur){
        //     case "pierre":
        //         imageOrdi.src = imagePierre;
        //         break;
        //     case "papier":
        //         imageOrdi.src = imagePapier;
        //         break;
        //     case "ciseaux":
        //         imageOrdi.src = imageCiseaux;
        //         break;
        // }
    
        //console.log(`choixJoueur : ${choixJoueur}, choixOrdinateur : ${choixOrdinateur}`);
    
    
        switch (chifoumi(choixJoueur, choixOrdinateur)) {
            case 0:
                break;
            case 1:
                //scoreJoueur.innerText = parseInt(scoreJoueur.innerText) + 1;
                break;
            case 2:
                //scoreOrdi.innerText = parseInt(scoreOrdi.innerText) + 1;
                break;
        }
        console.log(`score du joueur : ${scoreJoueur.innerText}`);
        console.log(`score de l'ordinateur : ${scoreOrdi.innerText}`);
    
        let textVictoire = "";
        if(scoreJoueur.innerText == "3"){
            textVictoire = "le joueur gagne la partie !!";
            console.log("le joueur gagne la partie !!");
            const buttons = [...document.querySelectorAll("input")];
            buttons.map(element => { element.disabled = true; })
        }
        if(scoreOrdi.innerText == "3"){
            textVictoire = "L'ordinateur gagne la partie !!";
            console.log("L'ordinateur gagne la partie !!");
            const buttons = [...document.querySelectorAll("input")];
            buttons.map(element => { element.disabled = true; })
        }
        document.querySelector("#btnRejouer").disabled = false;
        document.querySelector("#victoire").innerText = textVictoire;
    }

}





customElements.define("chifoumi-box", ChifoumiElement);