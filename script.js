
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const imageRoute = new Image();
const imageMoi = new Image();
const imageLui = new Image();

let imagesChargees = 0;

function verifierImages() {
    imagesChargees++;

    if (imagesChargees === 3) {
        animer();
    }
}

imageRoute.onload = verifierImages;
imageMoi.onload = verifierImages;
imageLui.onload = verifierImages;

imageRoute.src = "image/rue.png";
imageMoi.src = "image/moi.png";
imageLui.src = "image/lui.png";

const score = document.getElementById("score");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");

console.log(canvas);
console.log(ctx);
console.log(score);
console.log(leftBtn);
console.log(rightBtn);
console.log(message);
console.log(restartBtn);

// VARIABLES DE LA VOITURE DU JOUEUR

let voitureLargeur = 90;
let voitureHauteur = 125;

let voieActuelle = 1;

let voitureX = voieActuelle * 120 + (120 - voitureLargeur) / 2;
let voitureY = 400;

let scoreValue = 0;
let jeuTermine = false;


// VARIABLES DE L'OBSTACLE

let obstacleLargeur = 90;
let obstacleHauteur = 125;

let obstacleY = -125;

let voieObstacle = Math.floor(Math.random() * 3);
let obstacleX = voieObstacle * 120 + (120 - obstacleLargeur) / 2;

// DESSINER LA ROUTE

function dessinerRoute() {
    ctx.drawImage(imageRoute, 0, 0, 360, 540);
}

// DESSINER LA VOITURE DU JOUEUR

function dessinerVoiture() {
    ctx.drawImage(
        imageMoi,
        voitureX,
        voitureY,
        voitureLargeur,
        voitureHauteur
    );
}


// DESSINER L'OBSTACLE

function dessinerObstacle() {
    ctx.drawImage(
        imageLui,
        obstacleX,
        obstacleY,
        obstacleLargeur,
        obstacleHauteur
    );
}


// DESSINER TOUTE LA SCÈNE

function dessinerScene() {

    ctx.clearRect(0, 0, 360, 540);

    dessinerRoute();

    dessinerVoiture();

    dessinerObstacle();
}


// DÉPLACEMENT VERS LA GAUCHE

function allerAGauche() {

    if (voieActuelle > 0) {

        voieActuelle--;

        voitureX = voieActuelle * 120 + (120 - voitureLargeur) / 2;

        dessinerScene();
    }
}


// DÉPLACEMENT VERS LA DROITE

function allerADroite() {

    if (voieActuelle < 2) {

        voieActuelle++;

        voitureX = voieActuelle * 120 + (120 - voitureLargeur) / 2;

        dessinerScene();
    }
}


// CONTRÔLE AVEC LE CLAVIER

document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowLeft") {
        allerAGauche();
    }

    if (event.key === "ArrowRight") {
        allerADroite();
    }

});


// CONTRÔLE AVEC LES BOUTONS

leftBtn.addEventListener("click", allerAGauche);
rightBtn.addEventListener("click", allerADroite);


// AFFICHAGE INITIAL

 function collision() {

    const margeX = 27;
    const margeY = 32;

    return (
        voitureX + margeX < obstacleX + obstacleLargeur - margeX &&
        voitureX + voitureLargeur - margeX > obstacleX + margeX &&
        voitureY + margeY < obstacleY + obstacleHauteur - margeY &&
        voitureY + voitureHauteur - margeY > obstacleY + margeY
    );
}

function animer() {

    if (jeuTermine) {
        return;
    }

    // Faire descendre l'obstacle
    obstacleY += 3;

    // Redessiner la scène
    dessinerScene();

    // Vérifier la collision
    if (collision()) {

        jeuTermine = true;

        message.textContent = "GAME OVER !";

        return;
    }

    // Vérifier si l'obstacle est sorti de la route
    if (obstacleY > 540) {

        // Augmenter le score
        scoreValue++;

        score.textContent = scoreValue;

        // Replacer l'obstacle
        obstacleY = -obstacleHauteur;
voieObstacle = Math.floor(Math.random() * 3);
obstacleX = voieObstacle * 120 + (120 - obstacleLargeur) / 2;
    }

    requestAnimationFrame(animer);
}


function recommencer() {

    // Réinitialiser le score
    scoreValue = 0;
    score.textContent = scoreValue;

    // Réinitialiser la voiture du joueur
   voieActuelle = 1;
voitureX = voieActuelle * 120 + (120 - voitureLargeur) / 2;

obstacleY = -obstacleHauteur;
voieObstacle = Math.floor(Math.random() * 3);
obstacleX = voieObstacle * 120 + (120 - obstacleLargeur) / 2;
    // Réinitialiser le jeu
    jeuTermine = false;

    // Effacer le message
    message.textContent = "";

    // Relancer l'animation
    animer();
}
restartBtn.addEventListener("click", recommencer);