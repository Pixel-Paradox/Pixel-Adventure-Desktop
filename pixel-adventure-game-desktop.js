/*if (window.location.protocol != "https:") {
    window.location.protocol="https:";
}*/

document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 150) {
    collisionsMap.push(collisions.slice(i, 150 + i));
}
const a = 16;
class Boundary {
    static width = a;
    static height = a;
    constructor({position}) {
        this.position = position;
        this.width = a;
        this.height = a;
    }

    draw() {
        c.fillStyle = "red"
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

const boundaries = [];

const offset = {
    x: -50,
    y: -200
};

collisionsMap.forEach(function(row, i) {
    row.forEach(function(symbol, j) {
        if (symbol === 797 || symbol === 1175) {
            boundaries.push(new Boundary({position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y
            }}))
        }
    });
});

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
        x: offset.x,
        y: offset.y
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

const testBoundary = new Boundary({
    position: {
        x: 150,
        y: 120
    }
})

const movable = [background, testBoundary]; 

function animate() {
    window.requestAnimationFrame(animate);
    background.draw();
    boundaries.forEach(boundary =>{
        boundary.draw()
    })
    testBoundary.draw();
    const scale = 10;
    const newWidth = playerImage.width / scale;
    const newHeight = playerImage.height / scale;
    c.drawImage(
        playerImage,
        canvas.width / 2 - newWidth / 2,
        canvas.height / 2 - newHeight / 2,
        newWidth, newHeight
    );

    if (keys.w.pressed && lastKey === "w") {
        movable.forEach((movable) => {
            movable.position.y += 2;
        })
    }
    else if (keys.a.pressed && lastKey === "a") {
        movable.forEach((movable) => {
            movable.position.x += 2;
        })
    }
    else if (keys.s.pressed && lastKey === "s") {
        movable.forEach((movable) => {
            movable.position.y -= 2;
        })
    }
    else if (keys.d.pressed && lastKey === "d") {
        movable.forEach((movable) => {
            movable.position.x -= 2;
        })
    }
}
animate()

let lastKey = "";

window.addEventListener("keydown", function(e) {
    switch (e.key) {
        case "w":
            keys.w.pressed = true;
            lastKey = "w"
            break;
        case "a":
            keys.a.pressed = true;
            lastKey = "a";
            break;
        case "s":
            keys.s.pressed = true;
            lastKey = "s";
            break;
        case "d":
            keys.d.pressed = true;
            lastKey = "d";
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
});