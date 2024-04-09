let musiqueHome = new Audio('./Site/Music/home.mp3');
let musiqueMap = new Audio('./Site/Music/map.mp3');
let soundDialogue = new Audio('./Site/Music/soundDialogue.mp3');

let musiques = {
    musiqueHome,
    musiqueMap,
    soundDialogue
};

let adventureMusiques = {
    musiqueHome,
    musiqueMap,
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

soundDialogue.volume = 0.8;

function remplacerMusique(musiqueChoice1, musiqueChoice2) {
    for (let key in musiques) {
        if (musiques.hasOwnProperty(key)) {
            if (musiques[key] !== musiqueChoice1 &&  musiques[key] !== musiqueChoice2) {
                musiques[key].pause();
                musiqueChoice1.play();
            }
        }
    }
}
