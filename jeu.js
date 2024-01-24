// Récupération des éléments html

const coups = document.getElementById("compteur-coups");
const timeValue = document.getElementById("time");
const startBoutton = document.getElementById("start");
const stopBoutton = document.getElementById("stop");
const gameWrapper = document.querySelector(".game-wrapper");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-wrapper");

 // Initialisation des variables de jeu

 let cards;
 let interval;
 let firstCard = false;
 let secondCard = false;

 // Tableau des cartes

 const items = [
    {name: "dino-1", image: "Assets/Planets/planet1.jpg"},
    {name: "dino-2", image: "Assets/Planets/planet2.jpg"},
    {name: "dino-3", image: "Assets/Planets/planet3.jpg"},
    {name: "dino-4", image: "Assets/Planets/planet4.jpg"},
    {name: "dino-5", image: "Assets/Planets/planet5.jpg"},
    {name: "dino-6", image: "Assets/Planets/planet6.jpg"},
    {name: "dino-7", image: "Assets/Planets/planet7.jpg"},
    {name: "dino-8", image: "Assets/Planets/planet8.jpg"},
];

// Initialisation du compteur et des scores
let compteurCoups = 0,
    compteurVictoire = 0;

let seconds = 0,
minutes = 0;

//Timer
const timeGenerator = () => {
    seconds += 1;
    // minutes
    if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
    }
    //format avant affichafe
    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    timeValue.innerHTML = `<span>Temps: </span>${minutesValue}:${secondsValue}`;
};

// Calcul des coups 
const calculCoups = () => {
    compteurCoups +=1;
    coups.innerHTML = `<span>Coups : </span>${compteurCoups}`;
};

// Choix aléatoire de cartes dans le tableau
const generateRandom = (size = 4) => {
    // tableau initial
    let tableauInitial = [...items];
    // initialisation des cartes
    let cardValues = [];
    // double de la taille (matrix de 4*4) car on a des pairs de chaque objet
    size = (size*size) /2;
    // sélection aléatoire
    for (let i=0; i< size; i++) {
        const randomIndex = Math.floor(Math.random() * tableauInitial.length);
        cardValues.push(tableauInitial[randomIndex]);
        // une fois la carte sélectionnée, on la supprime du tableau
        tableauInitial.splice(randomIndex, 1);
    }
    return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
    gameWrapper.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    // mélange
    cardValues.sort(() => Math.random() - 0.5);
    for (let i=0; i <size*size; i++) {
        // attribut customisé pour stocker leurs noms
        console.log(cardValues[i].name);
        gameWrapper.innerHTML += `
        <div class="card-container" data-card-value="${cardValues[i].name}">
            <div class="card-before">?</div>
            <div class="card-after">
            <img src="${cardValues[i].image}" class="image"/></div>
        </div>
        `;
    }
    // Grid
    gameWrapper.style.gridTemplateColumns = `repeat(${size}, auto)`;

    // Cartes
    cards = document.querySelectorAll(".card-container");
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            // si la carte sélectionnée a déjà été retournée, on l'ignore
            if (!card.classList.contains("matched") && !card.classList.contains("flipped")) {
                // on retourne la carte
                card.classList.add("flipped");
                // si c'est la première carte !firstCard (car initialisée à false)
                if(!firstCard) {
                    // alors la carte actuelle devient la première carte
                    firstCard = card;
                    // la carte actuelle devient firstCardValue
                    firstCardValue = card.getAttribute("data-card-value");
                } else {
                    // on incrémente les coups car l'utilisateur selectionne une nouvelle carte
                    calculCoups();
                    secondCard = card;
                    let secondCardValue = card.getAttribute("data-card-value");
                    if (firstCardValue == secondCardValue) {
                        // si les deux cartes match, alors on les ignore
                        firstCard.classList.add("matched");
                        secondCard.classList.add("matched");
                        // on renvoie false pour firstCard puisque la prochaine carte est désormais la première
                        firstCard = false;
                        // on incrémente le compteurVictoire puisque le joueur a trouvé une paire
                        compteurVictoire += 1;
                        // on vérifie que le compteurVictoire == la moitié de cardValues
                        if(compteurVictoire == Math.floor(cardValues.length / 2)) {
                            result.innerHTML = `<h2>Vous avez gagné !</h2>
                        <h4>Coups: ${compteurCoups}</h4>`;
                            stopGame();
                        }
                    } else {
                         // si les cartes ne match pas, on les retourne
                         let [tempFirst, tempSecond] = [firstCard, secondCard];
                         firstCard = false;
                         secondCard = false;
                         let delay = setTimeout (() => {
                            tempFirst.classList.remove("flipped");
                            tempSecond.classList.remove("flipped");
                         }, 900);
                    }
                }
            }
        });
    });
};

// Commencer le jeu
startBoutton.addEventListener('click', startGame);
document.addEventListener('keydown', e => {
    if(e.code === 'Space') {
    startGame();
    }
});

function startGame() {
    compteurCoups = 0;
    seconds = 0;
    minutes = 0;
    // controls et visibilité du boutton
    controls.classList.add("hide");
    stopBoutton.classList.remove("hide");
    startBoutton.classList.add("hide");
    // initialisation timer
    interval = setInterval(timeGenerator, 1000);
    // initialisation coups
    coups.innerHTML = `<span>Coups : </span> ${compteurCoups}`;
    initializer(); 
    
}

// Stopper le jeu
stopBoutton.addEventListener("click", (stopGame = () => {
    controls.classList.remove("hide");
    stopBoutton.classList.add("hide");
    startBoutton.classList.remove("hide");
    clearInterval(interval);
})
);


// Initialisation des valeurs et appel des fonctions
const initializer = () => {
    result.innerText = "";
    compteurVictoire = 0;
    let cardValues = generateRandom();
    console.log(cardValues);
    matrixGenerator(cardValues);
};


