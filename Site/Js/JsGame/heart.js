const nbHeart = document.querySelector(".nbHeart");

const nbPotionHeart = document.querySelector(".nbPotionHeart");

const died = document.querySelector(".died");
const diedTopaze = document.querySelector(".diedTopaze");
const diedTopazeTxt = document.querySelector(".diedTopazeTxt");
const reprendreDied = document.querySelector(".reprendreDied");

let heartMax = 3;

let heart = heartMax;

let couldown = 0;

function heartChange(heartLess) {
    let currentTime = Date.now();

    if (playerSpeed === 3) {
        if (heartLess < 0) {
            heartLess = 0;
        }
    } else {
        if (heartLess < 0) {
            if (currentTime - couldown >= 2000) {

                couldown = currentTime;

                //player.image = player.sprites.up;

                heart += heartLess;

                if (musique) {
                    soundDamage.play();
                }
            }
        } else {
            heart += heartLess;

            if (musique) {
                soundDialogue.play();
            }
        }
    }

    if (heart > heartMax) {
        heart = heartMax;
    }

    if (heart <= 0) {
        heart = 0;
    }
}

let PotionHeart = 0;

function potionHeartChange(PotionHeartLess) {
    PotionHeart += PotionHeartLess;

    if(PotionHeart <= 0) {
        PotionHeart = 0;
    }
}

let diedReprendre = false;

reprendreDied.onclick = function() {;
    died.classList.remove("active");
    body.style.cursor = "none";
    menuKeys = false;

    if(!diedReprendre) {
        heart = heartMax;
        topazeChange(-2);
        diedReprendre = true;
    }
};