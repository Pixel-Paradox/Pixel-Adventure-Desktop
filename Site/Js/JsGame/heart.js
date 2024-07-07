const nbHeart = document.querySelector(".nbHeart");

const nbPotionHeart = document.querySelector(".nbPotionHeart");

const died = document.querySelector(".died");
const diedTopaze = document.querySelector(".diedTopaze");
const diedTopazeTxt = document.querySelector(".diedTopazeTxt");
const reprendreDied = document.querySelector(".reprendreDied");

const bgHeartLess = document.querySelector(".bgHeartLess");

let heartMax = 3;

let heart = heartMax;

let invincible = false

function heartChange(heartLess) {

    if (invincible) {
        if (heartLess < 0) {
            heartLess = 0;
        }
    } else {
        if (heartLess < 0) {
            bgHeartLess.classList.add("active");

            setTimeout(function() {
                bgHeartLess.classList.remove("active");
            }, 500);

            heart += heartLess;

            if (musique) {
                soundDamage.play();
            }

            if(heart ==! 0) {
                invincible = true;
                setTimeout(function() {
                    invincible = false;
                }, 2500);
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

reprendreDied.onclick = function() {
    died.classList.remove("active");
    body.style.cursor = "none";
    menuKeys = false;

    invincible = true;
    setTimeout(function() {
        invincible = false;
    }, 2500);

    if(!diedReprendre) {
        heart = heartMax;
        topazeChange(-2);
        diedReprendre = true;
    }
};