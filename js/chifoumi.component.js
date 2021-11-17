class ChifoumiElement extends HTMLElement {
    constructor() {
        super();
        this._scoreJoueur = 0;
        this._scoreOrdi = 0;
    }

    // static get observedAttributes(){
    //     return ["_scoreJoueur", "_scoreOrdi"];
    // }

    // attributeChangedCallback(name, oldValue, newValue){
    //     console.log(`name : ${name}, oldValue : ${oldValue}, newValue : ${newValue}`);
    //     if(name == "_scoreJoueur"){
    //         console.log("Le score du joueur vient de changer.");
    //     }
    //     if(name == "_scoreOrdi"){
    //         console.log("Le score de l'ordinateur vient de changer.");
    //     }
    // }

    //#region getters setters
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
    //#endregion getters setters

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

     /**
     * Renvoie un nombre aléatoire 0, 1 ou 2
     * @returns 0, 1 ou 2
     */
    static choixRandom = () => {
        return Math.floor(Math.random() * 3);
    }

    static choixOrdi = () => {
        const choixChifoumi = ['pierre', 'papier', 'ciseaux'];
        return choixChifoumi[ChifoumiElement.choixRandom()];
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

    connectedCallback() {
        this.attachShadow({ mode: "open" });

        const container = document.createElement("template");

        container.innerHTML = `
        <section id="chifoumi-container">
            <section id="choixJoueur">
                <input type="button" value="Pi" id="btnPierre" class="small-button">
                <input type="button" value="Pa" id="btnPapier" class="small-button">
                <input type="button" value="Ci" id="btnCiseaux" class="small-button">
            </section>
            <section id="imgChoix">
                <img src="#" alt="choix Joueur" id="imgChoixJoueur">
                <img src="#" alt="choix ordi" id="imgChoixOrdi">
            </section>           
            <section id="scores">
                Joueur <span id="scoreJoueur"></span> : <span id="scoreOrdi"></span> Ordi
            </section>
            <input type="button" value="rejouer" id="btnRejouer">
        </section>
        ${this.style}`;

        this.shadowRoot.appendChild(container.content.cloneNode(true));
        //Ajout des events sur les boutons
        this._addEventsButtons(this._findBoutonsChoix());
        this.shadowRoot.querySelector("#btnRejouer").addEventListener('click', this._reset);
        //On récupère les deux éléments qui afficheront le score des joueurs
        this._afficheScoreJoueur = this.shadowRoot.querySelector("#scoreJoueur");
        this._afficheScoreOrdi = this.shadowRoot.querySelector("#scoreOrdi");


    }


   
    _btnClick = (event) => {
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
        
        const choixOrdinateur = this.constructor.choixOrdi();
    
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
    
    
        switch (this.constructor.chifoumi(choixJoueur, choixOrdinateur)) {
            case 0:
                break;
            case 1:
                this._scoreJoueur++;
                break;
            case 2:
                this._scoreOrdi++;
                break;
        }
        console.log(`score du joueur : ${this._scoreJoueur}`);
        console.log(`score de l'ordinateur : ${this._scoreOrdi}`);

        this._afficheScoreJoueur.innerText = this._scoreJoueur;
        this._afficheScoreOrdi.innerText = this._scoreOrdi;
    
        let textVictoire = "";
        if(this._scoreJoueur == "3"){
            textVictoire = "le joueur gagne la partie !!";
            console.log("le joueur gagne la partie !!");
            this._desactiver();
        }
        if(this._scoreOrdi == "3"){
            textVictoire = "L'ordinateur gagne la partie !!";
            console.log("L'ordinateur gagne la partie !!");
            this._desactiver();
        }
        //this.shadowRoot.querySelector("#btnRejouer").disabled = false;
        // this.shadowRoot.querySelector("#victoire").innerText = textVictoire;
    }

    _findBoutonsChoix() {
        return this.shadowRoot.querySelectorAll(".small-button");
    }

    _addEventsButtons(buttons){
        for(let bouton of buttons){
            bouton.addEventListener("click", this._btnClick);
        }
    }

    _reset = (event) => {
        this._scoreJoueur = 0;
        this._scoreOrdi = 0;
        this._afficheScoreJoueur.innerText = 0;
        this._afficheScoreOrdi.innerText = 0;
        this._activer();
    }

    _activer(){
        const buttons = [...this._findBoutonsChoix()];
        buttons.map(element => { element.disabled = false; });
    }

    _desactiver(){
        const buttons = [...this._findBoutonsChoix()];
        buttons.map(element => { element.disabled = true; });
    }

}





customElements.define("chifoumi-box", ChifoumiElement);