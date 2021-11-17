const paireADN = (sequence) => {

    const paires = {
        "A" : "T",
        "G" : "C",
        "T" : "A",
        "C" : "G"
    }

    finalResult = [];

    for(base of sequence){
        finalResult.push([base, paires[base]]);
    }

    return finalResult;
};

const chifoumi = (choixJ1, choixJ2) => {
    const win = {
        "pierre" : "ciseaux",
        "papier" : "pierre",
        "ciseaux" : "papier"
    }

    if(choixJ2 == win[choixJ1]) return 1;
    if(choixJ1 == win[choixJ2]) return 2;
    return 0;

}

const binaryLetterConverter = (lettre) => {
    let result = 0;
    let pow = 0;
    for(let i = lettre.length - 1; i >= 0; i--){
        result += Math.pow(2, pow) * lettre[i];
        pow++;
    }
    return result;
}

const binarySentenceConverter = (sequence) => {
    lettres = sequence.split(" ");
    lettresAscii = lettres.map((item => {
        return String.fromCharCode(binaryLetterConverter(item));
    }));
    return lettresAscii.join("");
}

module.exports = {
    paireADN,
    chifoumi,
    binaryLetterConverter,
    binarySentenceConverter
};