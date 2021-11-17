import { chifoumi } from "./algos.js";


let scoreJoueur = document.querySelector("#scoreJoueur");
let scoreOrdi = document.querySelector("#scoreOrdi");

//Parcel à besoin que l'on définisse les url des images avant de les utiliser
const imagePierre = new URL('/assets/pierre.png', import.meta.url);
const imagePapier = new URL('/assets/papier.png', import.meta.url);
const imageCiseaux = new URL('/assets/ciseaux.png', import.meta.url);

scoreJoueur.innerText = 0;
scoreOrdi.innerText = 0;

const btnClick = (event) => {
    const idOfElement = event.target.getAttribute("id");
    const imageJoueur1 = document.querySelector("#imgJoueur1");
    const imageOrdi = document.querySelector("#imgOrdi");

    let choixJoueur = "";
    switch(idOfElement){
        case "btnPierre":
            choixJoueur = "pierre";
            imageJoueur1.src = imagePierre;
            break;
        case "btnPapier":
            choixJoueur = "papier";
            imageJoueur1.src = imagePapier;
            break;
        case "btnCiseaux":
            choixJoueur = "ciseaux";
            imageJoueur1.src = imageCiseaux;
            break;
    }
    
    const choixOrdinateur = choixOrdi();

    switch(choixOrdinateur){
        case "pierre":
            imageOrdi.src = imagePierre;
            break;
        case "papier":
            imageOrdi.src = imagePapier;
            break;
        case "ciseaux":
            imageOrdi.src = imageCiseaux;
            break;
    }

    console.log(`choixJoueur : ${choixJoueur}, choixOrdinateur : ${choixOrdinateur}`);


    switch (chifoumi(choixJoueur, choixOrdinateur)) {
        case 0:
            break;
        case 1:
            scoreJoueur.innerText = parseInt(scoreJoueur.innerText) + 1;
            break;
        case 2:
            scoreOrdi.innerText = parseInt(scoreOrdi.innerText) + 1;
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

const buttonPierre = document.querySelector("#btnPierre");
buttonPierre.addEventListener("click", btnClick);


const buttonpapier = document.querySelector("#btnPapier");
buttonpapier.addEventListener("click", btnClick);


const buttonCiseaux = document.querySelector("#btnCiseaux");
buttonCiseaux.addEventListener("click", btnClick);


/**
 * Renvoie un nombre aléatoire 0, 1 ou 2
 * @returns 0, 1 ou 2
 */
const choixRandom = () => {
    return Math.floor(Math.random() * 3);
}

const choixOrdi = () => {
    const choixChifoumi = ['pierre', 'papier', 'ciseaux'];
    return choixChifoumi[choixRandom()];
}
