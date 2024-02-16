/*if (window.location.protocol != "https:") {
    window.location.protocol="https:";
}*/

document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = 'map.png';

const playerImage = new Image();
playerImage.src = 'player.png';

class Sprite {
    constructor({position, velocity, image}) {
        this.position = position;
        this.image = image;
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }
}

const background = new Sprite({
    position: {
        x: -50,
        y: -200
    },
    image: image
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

function animate() {
    window.requestAnimationFrame(animate);
    background.draw();
    const scale = 10;
    const newWidth = playerImage.width / scale;
    const newHeight = playerImage.height / scale;
    c.drawImage(
        playerImage,
        canvas.width / 2 - newWidth / 2,
        canvas.height / 2 - newHeight / 2,
        newWidth, newHeight
    );

    if (keys.w.pressed) background.position.y += 3;
    else if (keys.a.pressed) background.position.x += 3;
    else if (keys.s.pressed) background.position.y -= 3;
    else if (keys.d.pressed) background.position.x -= 3;
}
animate()

window.addEventListener("keydown", function(e) {
    switch (e.key) {
        case "w":
            keys.w.pressed = true;
            break;
        case "a":
            keys.a.pressed = true;
            break;
        case "s":
            keys.s.pressed = true;
            break;
        case "d":
            keys.d.pressed = true;
            break;        
    }
});

window.addEventListener("keyup", function(e) {
    switch (e.key) {
        case "w":
            keys.w.pressed = false;
            break;
        case "a":
            keys.a.pressed = false;
            break;
        case "s":
            keys.s.pressed = false;
            break;
        case "d":
            keys.d.pressed = false;
            break;        
    }
    console.log(keys);
});