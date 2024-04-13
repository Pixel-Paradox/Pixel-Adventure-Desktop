let musiqueHome = new Audio('./Site/Music/home.mp3');
let musiqueMap = new Audio('./Site/Music/map.mp3');
let musiqueDied = new Audio('./Site/Music/died.mp3');
let soundDialogue = new Audio('./Site/Music/soundDialogue.mp3');

let musiques = {
    musiqueHome,
    musiqueMap,
    soundDialogue,
    musiqueDied,
};

let adventureMusiques = {
    musiqueHome,
    musiqueMap,
    musiqueDied
};

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

musiqueHome.volume = 0.08;
musiqueMap.volume = 0.08;
musiqueDied.volume = 0.08;

soundDialogue.volume = 0.8;

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
