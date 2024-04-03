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
        dialogueFunction("Le vagabond", "Hé, vous là-bas. Vous vous êtes réveillé, approchez un peu plus, laisse-moi regarder dans tes yeux. Ah, je le savais. Tu es différent, n'est-ce pas ? Un fragment de quelque chose de bien plus grand, peut-être. Je ne suis pas ici pour te vendre des potions ou te raconter des histoires. Non, je suis ici pour te révéler la vérité, aussi sombre soit-elle. Les étoiles murmurent des secrets oubliés, des promesses brisées et des destins entrelacés. Et vous, mon ami, vous êtes au centre de tout cela. Les chemins que vous empruntez ne sont pas tracés dans le sable, mais dans le tissu même de la réalité. Chaque pas que vous faites résonne à travers les éthers de l'existence. Écoute-moi bien, car je ne répéterai pas ces mots. Ton destin est une énigme, une étoile filante dans la nuit, et vous seul détenez la clé de sa signification mais je ne peux pas vous en parler plus... Alors, allez-y. Explorez. Découvrez les mystères qui vous attendent, et peut-être, juste peut-être, trouverez-vous la vérité que vous cherchez...");
        vagabondDialogue = true
    }

    if(vagabondDialogue) {
        if (villager === chef) {
            dialogueFunction("Chef d'Amarantis", "Bienvenue à Amarantis, c'est moi qui dirige ce petit village. Comme vous le savez peut-être, le vagabond vous a trouvé évanoui et vous a ramené à l'Hôpital du Village. Vous êtes resté endormi pendant plusieurs mois. Ces temps-ci, il se passe des choses bizarres. Une menace vous en veut. Excusez-moi, je ne vous ai pas demandé votre nom et d'où vous venez? ...Je vois, vous ne vous en souvenez de rien. Je vais vous donner une carte du village, vous pourrez aller à la rencontre des autres villageois, ils sont très sympas. Allez voir la bibliothèque pour en savoir plus sur ce village, mais n'allez pas tout de suite à la forêt, c'est dangereux d'aller là-bas. Il y a quelque temps, un villageois y est allé et n'est jamais revenu.");
            chefDialogue = true
            map = true;
        }
          
        else if (villager === ragnerus) {
            dialogueFunction("Ragnerus", "Bonjour, je vois que vous êtes nouveau. Ici, c'est le village d'Amarantis. Le vagabond vous a ramené à l'Hôpital du Village, on ne sait pas où il vous a trouvé. Vous êtes resté endormi pendant plusieurs mois. Le vagabond est bizarre... il ne parle avec personne... on ne le connaît pas tellement... Ce n'est pas un habitant d'Amarantis. Il habite dans la forêt à l'ouest. Le chef du village d'Amarantis attend avec impatience de vous parler. Il se trouve dans sa grande maison au sud du village.");
        }
    } else {
        dialogueFunction("Maitre du jeu", "Veuillez d'abord parler au vagbond.");
    }
}