const nbPotionSpeed = document.querySelector(".nbPotionSpeed");

let playerSpeed = 2;

let PotionSpeed = 0;

function potionSpeedChange(PotionSpeedLess) {
    PotionSpeed += PotionSpeedLess;

    if(PotionSpeed <= 0) {
        PotionSpeed = 0;
    }
}