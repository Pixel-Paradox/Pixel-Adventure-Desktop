let musiqueHome = new Audio('a.mp3');
let musiqueMap = new Audio('b.mp3');

let musiques = {
    musiqueHome,
    musiqueMap
};

function setMusicLoop(music) {
    music.addEventListener('ended', function() {
        music.currentTime = 0;
        music.play();
    });
}

for (let key in musiques) {
    if (musiques.hasOwnProperty(key)) {
        setMusicLoop(musiques[key]);
    }
}

musiqueHome.volume = 0.08;
musiqueMap.volume = 0.08;