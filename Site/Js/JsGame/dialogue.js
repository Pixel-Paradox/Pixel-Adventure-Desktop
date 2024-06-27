const dialogue = document.querySelector(".dialogue");
const text = document.querySelector(".text");
const username = document.querySelector(".name");

let vagabondDialogueNb = 0;
let vagabondDialogue = 0;

let chefDialogueNb = 0;
let chefDialogue = 0;

let ragnerusDialogueNb = 0;
let ragnerusDialogue = 0;

let dogDialogueNb = 0;
let dogDialogue = 0;

let voyageurDialogueNb = 0;
let voyageurDialogue = 0;

let georasDialogueNb = 0;
let georasDialogue = 0;

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

        if (musique) {
            soundDialogue.play();
        }

        if (currentSegment < nbDialogue) {
            timeoutVillager = setTimeout(displaySegment, time);
        } else {
            timeoutVillager = setTimeout(function() {
                
                villagers.forEach(villager => {
                    villager.sprite.movingVillager = false;
                })

                if (musique) {
                    soundDialogue.pause();
                }

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


    

    // Vagabond

    if(villager === vagabond) {
        if(vagabondDialogueNb === 0) {

            // Vagabond 1 dialogue

            dialogueFunction("Le vagabond", "Hé, vous là-bas. Vous vous êtes réveillé, approchez un peu plus. Tu ne sais pas ce qu'il s'est passé... Tu ne connais pas la vérité... je ne peux pas trop en dire... trouverez-vous par vous-même la vérité que vous cherchez... maintenant je dois partir.");
    
            if(vagabondDialogue === 0) {
                progressChange(25);
                setTimeout(function() {
                    vagabond.sprite.position.y -= 100;
                    vagabond.sprite.position.x -= 1550;
                    vagabondDialogueNb = 1;
                }, 20000);
            }

            vagabondDialogue = 1;

        } else

        if(vagabondDialogueNb === 1) {

            // Vagabond 2 dialogue

            dialogueFunction("Le vagabond", "b");

            vagabondDialogue = 2;

        }
    } else
    
    


    if(vagabondDialogue !== 0) {




        // Quete principale

        // Chef

        if (villager === chef) {
            if(chefDialogueNb === 0) {

                // Chef 1 dialogue

                dialogueFunction("Chef d'Amarantis", "Bienvenue à Amarantis, c'est moi qui dirige ce petit village. Comme vous le savez peut-être, le vagabond vous a trouvé évanoui et vous a ramené à l'Hôpital du Village. ...Quoi??? Il vous a parlé à l'hôpital et a disparu, je pense que vous avez rêvé. Vous êtes resté endormi pendant plusieurs mois. Ces temps-ci, il se passe des choses bizarres. Une menace vous en veut. Excusez-moi, je ne vous ai pas demandé votre nom et d'où vous venez? ...Je vois, vous ne vous en souvenez de rien. Pour visiter le village, je vais vous donner une carte du village, vous pourrez aller à la rencontre des autres villageois, ils sont très sympas. Allez voir la bibliothèque, le magasin, etc... et les villageois, pour en savoir plus sur ce village. Nous avons notre propre monnaie, le topaze. Vous pouvez vous en procurer en rendant des services aux gens, par exemple. Je vais vous en donner 10. Il y a le voyageur Hesther qui vous attend avec impatience, je crois qu'il a quelque chose à vous demander, mais une dernière information : n'allez surtout pas à la forêt, c'est dangereux d'y aller. Il y a quelque temps, un villageois y est allé et n'est jamais revenu...");

                if(chefDialogue === 0) {
                    topazeChange(10);
                }

                chefDialogue = 1;

            } else 

            if(chefDialogueNb === 1) {

                // Chef 2 dialogue

                dialogueFunction("Chef d'Amarantis", "Bonjour, Vous avez parlé avec le voyageur Hesther ...Vous allez l'aidé a finir son périple. Vous n'avez pas encore repris tout votre energie, allez d'abbord jusqu'a la maison de Georas Il est très sympa il vous expliqueras comment sont les montagnes il aimes bien faire des prommenades et quand vous reviendrez j'estimerais que vous êtes assé en forme pour partir avec le voyageur.");

                chefDialogue = 2;

            } else
            
            if(chefDialogueNb === 2) {

                // Chef 3 dialogue

                dialogueFunction("Chef d'Amarantis", "Vous êtes allez voir Georus ...Il vous a donné une potion de rapidité. Je pense que vous êtes près pour allé finir le périple avec le voyageur et sa vous permetteras peut-être de vous rémorer des souvenirs, allez le voir.");

                if(chefDialogue === 2) {
                    voyageurDialogueNb = 1;
                } 

                chefDialogue = 3;

            }
        } else 




        // Voyageur

        if (villager === voyageur) {

            if(chefDialogue !== 0) {

                if(voyageurDialogueNb === 0) {

                    // Voyageur 1 dialogue

                    dialogueFunction("Voyageur", "Salut ! Enfin je peux te tutoyer ? ...D'accord, alors on se tutoie. Je m'appelle Hesther. Je suis un voyageur et un aventurier, je viens d'un autre village très au sud. Je suis en train de faire un long périple, j'ai commencé par le Sud-Ouest et je prends une petite pause ici à Amarantis. Je dois finir au nord-Ouest mais je voulais te parler car pour finir mon voyage je dois passer par la forêt. Mais tout le monde m'a dit que c'était très dangereux et les habitants ont tous peur depuis qu'un villageois n'y est jamais revenu. Mais toi, je sens en toi que tu as du courage. Voudrais-tu bien m'accompagner pour finir mon périple ? ...Super, je te récompenserai à la fin de mon voyage. Je vais commencer par monter sur la montagne pour voir la vue et voir la forêt de haut. Juste je dois attendre que le chef du village accepte que tu parte avec moi, on commencera en montant la montagne au nord-est. Vas parler au chef d'Amarantis pour savoir si il est daccord qu tu parte avec moi.");

                    if(voyageurDialogue === 0) {
                        chefDialogueNb = 1;
                    }

                    voyageurDialogue = 1;

                } else

                if(voyageurDialogueNb === 1) {

                    // Voyageur 2 dialogue
    
                    dialogueFunction("Voyageur", "Ah c'est bon le chef du village à enfin accepté que tu viennes gravire la montagne avec moi. Retrouves moi au début de la montagne au nord.");

                    if(voyageurDialogue === 1) {
                        progressChange(50);
                        setTimeout(function() {
                            voyageur.sprite.position.y -= 910;
                            voyageur.sprite.position.x += 370;
                            voyageurDialogueNb = 2;
                        }, 2000);
                    }
    
                    voyageurDialogue = 2;
    
                }

            } else {
                dialogueFunction("Maitre du jeu", "Veuillez d'abord parler au Chef d'Amarantis.");
            }
        } else




        // Georoas

        if (villager === georas) {

            if(chefDialogue > 1) {

                if(georasDialogueNb === 0) {

                    // Georas 1 dialogue

                    dialogueFunction("Georas", "Bonjour, je m'appelle Georas. Je suis un ami du  chef d'Amarantis. Je fais beaucoup de promenade ...Tu veux gravire la montagne. C'est assé long mais C'est pas compliqué. je vais t'offrir une potion qui permet de courir plus vite, tellement vite que tu es invulnérable au dégat. C'est une potion verte et elle dure que 10 secondes, utilise la que quand vous en avez vraiment besoin. Allez de nouveau voir le chef du village.");

                    if(georasDialogue === 0) {
                        potionSpeedChange(1);
                        chefDialogueNb = 2;
                    }

                    georasDialogue = 1;
                }

            } else {
                dialogueFunction("Maitre du jeu", "Veuillez d'abord parler avec le deuxième dialogue du Chef.");
            }
        } else




        // Quete secondaire

        // Ragnerus
      
        if (villager === ragnerus) {
            if(ragnerusDialogueNb === 0) {

                // Ragnerus 1 dialogue

                dialogueFunction("Ragnerus", "Bonjour, je vois que vous êtes nouveau. Ici, c'est le village d'Amarantis. J'habite ici, ma maison est juste a coté je m'appelle Ragnerus. Le vagabond vous a ramené à l'Hôpital du Village. Il vous à trouvez dans la forêt. Vous êtes resté longtemps. Le vagabond est bizarre... il ne parle avec personne... on ne le connaît pas tellement... Ce n'est pas un habitant d'Amarantis. Il habite dans la forêt à l'ouest, c'est un forêt dangereuse et j'allais oublier vous pouvez me rendre un service mon chien s'est perdu depuis plus de 2 jours essayez de le retrouver s'il vous plait, je vous donnerez une petite récompense mais faite attention car il mord.");

                ragnerusDialogue = 1;

            } else

            if(ragnerusDialogueNb === 1) {

                // Ragnerus 2 dialogue

                dialogueFunction("Ragnerus", "Merci d'avoir retrouvé mon chien. J'avais si peur pour lui. Il vous a griffé, je vais mieux l'éduquer. Pour te remercier de l'avoir ramené je te donne 3 topazes.");
                
                if(ragnerusDialogue === 1) {
                    topazeChange(3);
                    progressChange(25);
                }

                ragnerusDialogue = 2;

            }
        } else




        // Chien
    
        if (villager === dog) {

            if(ragnerusDialogue !== 0) {

                if(dogDialogueNb === 0) {

                    // Chien 1 dialogue

                    dialogueFunction("Chien de Ragnerus", "Woaf Woaf Woaf.");

                    if(dogDialogue === 0) {
                        heartChange(-1);
                        setTimeout(function() {
                            dog.sprite.position.y -= -970;
                            dog.sprite.position.x -= -230;
                            ragnerusDialogueNb = 1;
                        }, 11000);
                    }

                    dogDialogue = 1;

                }  

            } else {
                dialogueFunction("Maitre du jeu", "Veuillez d'abord parler a Ragnerus.");
            }  
        }
        
        


    } else {
        dialogueFunction("Maitre du jeu", "Veuillez d'abord parler au Vagbond.");
    }




}