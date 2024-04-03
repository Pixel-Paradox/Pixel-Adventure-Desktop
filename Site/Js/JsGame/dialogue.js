const dialogue = document.querySelector(".dialogue");
const text = document.querySelector(".text");
const username = document.querySelector(".name");

const carte = document.querySelector(".carte");

let carteKeys = false

let timeoutVillager;
let currentSegment = 0;

function dialogueFunction(usernames, texts) {
    username.textContent = usernames;
    let time = 10000;
    let segmentLength = 200;
    let nbDialogue = Math.ceil(texts.length / segmentLength);

    function displaySegment() {
        let start = currentSegment * segmentLength;
        let end = Math.min((currentSegment + 1) * segmentLength, texts.length);

        text.textContent = texts.substring(start, end);

        currentSegment++;

        if (currentSegment < nbDialogue) {
            timeoutVillager = setTimeout(displaySegment, time);
        } else {
            timeoutVillager = setTimeout(function() {
                villagers.forEach(villager => {
                    villager.sprite.movingVillager = false;
                })

                dialogue.classList.remove("active");
            }, time);
        }
    }

    currentSegment = 0;
    displaySegment();

    dialogue.classList.add("active");
}

let vagabondDialogue = false
let chefDialogue = false

let map = false;

function keydialogue(villager) {
    clearTimeout(timeoutVillager);
    villager.sprite.movingVillager = true;

    if (villager === vagabond) {
        dialogueFunction("Le vagabond", "Hé, vous là-bas. Vous vous êtes réveillez, approchez un peu plus, laisse-moi regarder dans tes yeux. Ah, je le savais. Tu es différent, n'est-ce pas ? Un fragment de quelque chose de bien plus grand, peut-être. Je ne suis pas ici pour te vendre des potions ou te raconter des histoires. Non, je suis ici pour te révéler la vérité, aussi sombre soit-elle. Les étoiles murmurent des secrets oubliés, des promesses brisées et des destins entrelacés. Et vous, mon ami, vous êtes au centre de tout cela. Les chemins que vous empruntez ne sont pas tracés dans le sable, mais dans le tissu même de la réalité. Chaque pas que vous faites résonne à travers les éthers de l'existence. Écoute-moi bien, car je ne répéterai pas ces mots. Ton destin est une énigme, une étoile filante dans la nuit, et vous seul détenez la clé de sa signification mais je ne peut pas vous en parlez plus... Alors, allez-y. Explorez. Découvre les mystères qui vous attendent, et peut-être, juste peut-être, trouverez-vous la vérité que vous cherchez...");
        vagabondDialogue = true
    }

    if(vagabondDialogue) {
        if (villager === chef) {
            dialogueFunction("Chef d'Amarantis", "Bienvenue à Amarantis, c'est moi qui dirige ce petit village, comme vous le savez peut-être le vagabond vous à trouvez évanoui et vous à ramené dans l'Hopital du Village. Vous êtes resté endormi pendant plusieurs mois. Ces temps-ci il se passe des choses bizzard, une menace vous en veux, exusez-moi je ne vous ai pas demandé votre nom et d'ou vous vous vené? ...Je vois vous vous en souvenez de rien. Je vais vou donner une carte du village vour pourrez allé à la rencontre des autres villageois il sont très sympa et allez voir la bibliothèque pour connaitre plus ce village mais n'allez pas tout de suite à la forêt c'est dangereux d'aller la-bas, Il y a quelque temps un villageois est allé il n'est plus jamais revenu...");
            chefDialogue = true
            map = true;
        }
          
        else if (villager === ragnerus) {
            dialogueFunction("Ragnerus", "Bonjour, Je vois que vous êtes nouveau. Ici c'est le le village d'Amarantis. Le vagabond vous à ramené dans l'Hopital du Village, on ne sais pas ou il vous a trouvé. Vous êtes resté endormi pendant plusieurs mois. Le vagabond est bizzard... il parle avec personne... on ne le connait pas telement... Ce n'est pas un habitant d'Armentis. Il habite dans la forêt a l'Ouest. Le chef du village d'Amarantis attend avec impatience de vous parlé il se trouve dans sa grand masion au sud du Village.");
        }
    } else {
        dialogueFunction("Maitre du jeu", "Veulliez d'abbord parler au vagbond.");
    }
}