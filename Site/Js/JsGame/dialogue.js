const dialogue = document.querySelector(".dialogue");
const text = document.querySelector(".text");
const username = document.querySelector(".name");

const nbTopaz = document.querySelector(".nbTopaz");

const carte = document.querySelector(".carte");

let topaz = 0;

let vagabondDialogueNb = 0;
let vagabondDialogue = 0;

let chefDialogueNb = 0;
let chefDialogue = 0;
let map = false;

let ragnerusDialogueNb = 0;
let ragnerusDialogue = 0;

let dogDialogueNb = 0;
let dogDialogue = 0;

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

function keydialogue(villager) {
    clearTimeout(timeoutVillager);
    villager.sprite.movingVillager = true;


    if(villager === vagabond) {
        if(vagabondDialogueNb === 0) {
            dialogueFunction("Le vagabond", "Hé, vous là-bas. Vous vous êtes réveillé, approchez un peu plus, laisse-moi regarder dans tes yeux. Ah, je le savais. Tu es différent, n'est-ce pas ? Un fragment de quelque chose de bien plus grand, peut-être. Je ne suis pas ici pour te vendre des potions ou te raconter des histoires. Non, je suis ici pour te révéler la vérité, aussi sombre soit-elle. Les étoiles murmurent des secrets oubliés, des promesses brisées et des destins entrelacés. Et vous, mon ami, vous êtes au centre de tout cela. Les chemins que vous empruntez ne sont pas tracés dans le sable, mais dans le tissu même de la réalité. Chaque pas que vous faites résonne à travers les éthers de l'existence. Écoute-moi bien, car je ne répéterai pas ces mots. Ton destin est une énigme, une étoile filante dans la nuit, et vous seul détenez la clé de sa signification mais je ne peux pas vous en parler plus... Alors, allez-y. Explorez. Découvrez les mystères qui vous attendent, et peut-être, juste peut-être, trouverez-vous la vérité que vous cherchez...");
            vagabondDialogue = 1;
        } /*else

        if(vagabondDialogueNb === 1) {
            dialogueFunction("Le vagabond", "b");
        }*/
    } else 
    



    if(vagabondDialogue !== 0) {

        if (villager === chef) {
            if(chefDialogueNb === 0) {
                dialogueFunction("Chef d'Amarantis", "Bienvenue à Amarantis, c'est moi qui dirige ce petit village. Comme vous le savez peut-être, le vagabond vous a trouvé évanoui et vous a ramené à l'Hôpital du Village, mais on ne sait pas où il vous a trouvé. Vous êtes resté endormi pendant plusieurs mois. Ces temps-ci, il se passe des choses bizarres. Une menace vous en veut. Excusez-moi, je ne vous ai pas demandé votre nom et d'où vous venez? ...Je vois, vous ne vous en souvenez de rien. Pour visiter le village je vais vous donner une carte du village, vous pourrez aller à la rencontre des autres villageois, ils sont très sympas. Allez voir la bibliothèque, le magasin, etc... et les villageois, pour en savoir plus sur ce village. Nous avons notre propre monnaie le topaz vous pouvez vous en procurez en rendand des service au gens par exemple. Je vais vous en donnez 10, mais n'allez surtout pas à la forêt, c'est dangereux d'aller là-bas. Il y a quelque temps, un villageois y est allé et n'est jamais revenu...");
                map = true;
                if(chefDialogue === 0) {
                    /*vagabondDialogueNb = 1;*/
                    topaz += 10;
                }
                chefDialogue = 1;
            }
        } else 
      
        if (villager === ragnerus) {
            if(ragnerusDialogueNb === 0) {
                dialogueFunction("Ragnerus", "Bonjour, je vois que vous êtes nouveau. Ici, c'est le village d'Amarantis. J'habite ici, ma maison est juste a coté je m'appelle Ragnerus. Le vagabond vous a ramené à l'Hôpital du Village. Vous êtes resté longtemps. Le vagabond est bizarre... il ne parle avec personne... on ne le connaît pas tellement... Ce n'est pas un habitant d'Amarantis. Il habite dans la forêt à l'ouest, c'est un forêt dangereuse. Le chef du village d'Amarantis attend avec impatience de vous parler. Il se trouve dans sa grande maison au sud du village, et j'allais oublier vous pouvez me rendre un service mon chien s'est perdu depuis plus de 2 jours essayez de le retrouver s'il vous plait, je vous donnerez une petite récompense.");
                ragnerusDialogue = 1;
            } else

            if(ragnerusDialogueNb === 1) {
                dialogueFunction("Ragnerus", "Merci d'avoir retrouvé mon chien. J'avais si peur pour lui. Pour te remercier je te donne 3 topazes.");
                if(ragnerusDialogue === 1) {;
                    topaz += 3;
                }
                ragnerusDialogue = 2;
            }
        } else




        if(ragnerusDialogue !== 0) {

            if (villager === dog) {
                if(dogDialogueNb === 0) {
                    dialogueFunction("Chien de Ragnerus", "Woaf Woaf Woaf.");
                    if(dogDialogue === 0) {
                        setTimeout(function() {
                            dog.sprite.position.y -= 100;
                            dog.sprite.position.x -= 30;
                            ragnerusDialogueNb = 1;
                        }, 12000);
                    }
                    dogDialogue = 1;
                }
            }

        } else {
            dialogueFunction("Maitre du jeu", "Veuillez d'abord parler a Ragnerus.");
        }
        
    } else {
        dialogueFunction("Maitre du jeu", "Veuillez d'abord parler au Vagbond.");
    }
}