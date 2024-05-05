const musiqueHome = new Audio('./Site/Music/home.mp3');
const musiqueMap = new Audio('./Site/Music/map.mp3');
const musiqueDied = new Audio('./Site/Music/died.mp3');

const soundDialogue = new Audio('./Site/Music/soundDialogue.mp3');
const soundDamage = new Audio('./Site/Music/soundDamage.mp3');

const musiques = {
    musiqueHome,
    musiqueMap,
    soundDialogue,
    musiqueDied,
    soundDamage
};

const adventureMusiques = {
    musiqueHome,
    musiqueMap,
    musiqueDied
};

const soundMusiques = {
    soundDialogue,
    soundDamage
};

musiqueHome.volume = 0.08;
musiqueMap.volume = 0.08;
musiqueDied.volume = 0.08;

soundDialogue.volume = 0.8;
soundDamage.volume = 0.3;

function setMusicLoop(music) {
    music.addEventListener('ended', function() {
        music.currentTime = 0;
        music.play();
    });
}

for (let key in musiques) {
    if (adventureMusiques.hasOwnProperty(key)) {
        setMusicLoop(adventureMusiques[key]);
    }
}

function remplacerMusique(musiqueChoice1) {
    for (let key in adventureMusiques) {
        if (adventureMusiques.hasOwnProperty(key)) {
            if (adventureMusiques[key] !== musiqueChoice1) {
                adventureMusiques[key].pause();
                adventureMusiques[key].currentTime = 0;
                musiqueChoice1.play();
            }
        }
    }
}

function deletSound() {
    for (let key in soundMusiques) {
        soundMusiques[key].pause();
        soundMusiques[key].currentTime = 0;
    }
}