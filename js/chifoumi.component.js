class ChifoumiElement extends HTMLElement {
    constructor() {
        super();
        this._scoreJoueur = 0;
        this._scoreOrdi = 0;
        //Url des images
        /*
https://i.postimg.cc/9XYcNcGs/ciseaux.png
https://i.postimg.cc/gkcmC1sj/papier.png
https://i.postimg.cc/m2dBBVpw/pierre.png
        */
       this._urlPierre = "https://i.postimg.cc/m2dBBVpw/pierre.png";
       this._urlPapier = "https://i.postimg.cc/gkcmC1sj/papier.png";
       this._urlCiseaux = "https://i.postimg.cc/9XYcNcGs/ciseaux.png";
    }

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

    get urlPierre(){
        return this._urlPierre;
    }
    set urlPierre(url){
        this._urlPierre = url;
    }

    get urlPapier(){
        return this._urlPapier;
    }
    set urlPapier(url){
        this._urlPapier = url;
    }

    get urlCiseaux(){
        return this._urlCiseaux;
    }
    set urlCiseaux(url){
        this._urlCiseaux = url;
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
            #imgChoix img{
                width: 80px;
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
                <img src="${this.urlPierre}" alt="choix Joueur" id="imgChoixJoueur">
                <img src="${this.urlPierre}" alt="choix ordi" id="imgChoixOrdi">
            </section>           
            <section id="scores">
                Joueur <span id="scoreJoueur">${this._scoreJoueur}</span> : <span id="scoreOrdi">${this._scoreOrdi}</span> Ordi
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
        const imageJoueur1 = this.shadowRoot.querySelector("#imgChoixJoueur");
        const imageOrdi = this.shadowRoot.querySelector("#imgChoixOrdi");
    
        let choixJoueur = "";
        switch(idOfElement){
            case "btnPierre":
                choixJoueur = "pierre";
                imageJoueur1.src = this.urlPierre;
                break;
            case "btnPapier":
                choixJoueur = "papier";
                imageJoueur1.src = this.urlPapier;
                break;
            case "btnCiseaux":
                choixJoueur = "ciseaux";
                imageJoueur1.src = this.urlCiseaux;
                break;
        }
        
        const choixOrdinateur = this.constructor.choixOrdi();
    
        switch(choixOrdinateur){
            case "pierre":
                imageOrdi.src = this.urlPierre;
                break;
            case "papier":
                imageOrdi.src = this.urlPapier;
                break;
            case "ciseaux":
                imageOrdi.src = this.urlCiseaux;
                break;
        }
    
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