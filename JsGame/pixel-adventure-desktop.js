// Canvas creation

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
c.imageSmoothingEnabled = true;

// Hang Tiled data

function splitArrayIntoChunks(array) {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += 150) {
        chunkedArray.push(array.slice(i, 150 + i));
    }
    return chunkedArray;
}

const mapCollisions = splitArrayIntoChunks(collisionsMap);
const frontHomeMap = splitArrayIntoChunks(frontHome);

const offset = {
    x: -35,
    y: -35
};

const mapOfCollisions = [];
const frontOfHomes = []

function createBoundariesFromArray(array, boundaryList) {
    array.forEach(function(row, i) {
        row.forEach(function(symbol, j) {
            if (symbol !== 0) {
                boundaryList.push(new Boundary({position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }}));
            }
        });
    });
}

createBoundariesFromArray(mapCollisions, mapOfCollisions);
createBoundariesFromArray(frontHomeMap, frontOfHomes);

// Player image

const player1 = new Image();
player1.src = './ImageGame/player1.png';

const player2 = new Image();
player2.src = './ImageGame/player2.png';

const player3 = new Image();
player3.src = './ImageGame/player3.png';

const player4 = new Image();
player4.src = './ImageGame/player4.png';

// Map image

const mapBackground = new Image();
mapBackground.src = './ImageGame/map.png';

const mapForeground = new Image();
mapForeground.src = './ImageGame/foreground.png';

// Houses image 

const homeBackground = new Image();
homeBackground.src = './ImageGame/home.png';

// Player creation

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 10,
        y: canvas.height / 2 - 16.1
    },
    image: player1,
    frames: {
        max: 4
    },
    sprites: {
        up: player2,
        down: player1,
        left: player4,
        right: player3,
    }
})

// Map creation

const backgroundMap = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: mapBackground
})

const foregroundMap = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: mapForeground
})

// Home creation

const backgroundHome = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: homeBackground
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

const movable = [backgroundMap , foregroundMap, ...mapOfCollisions, backgroundHome, ...frontOfHomes];
 
function rectangularCollision({rectangle1, rectangle2}) {
    return(
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

let base = "map";

function animate() {
    window.requestAnimationFrame(animate);

    let moving = true;

    if(base === "map") {
        backgroundMap.draw();
        player.draw();
        foregroundMap.draw();

        player.moving = false;

        mapOfCollisions.forEach(boundary => {
            boundary.draw()
        });

        frontOfHomes.forEach(frontOfHome => {
            frontOfHome.draw()
        });

        if(menuKeys) {
            if (keys.w.pressed && lastKey === "w") {
                player.moving = true;
                player.image = player.sprites.up;

                for (let i = 0; i < mapOfCollisions.length; i++) {
                    const boundary = mapOfCollisions[i];
                    if(
                        rectangularCollision({
                            rectangle1: player,
                            rectangle2: {...boundary, position: {
                                x: boundary.position.x,
                                y: boundary.position.y + 2
                            }}
                        })
                    ){
                        moving = false;
                        break;
                    }
                }

                for (let i = 0; i < frontOfHomes.length; i++) {
                    const frontOfHome = frontOfHomes[i];
                    if(
                        rectangularCollision({
                            rectangle1: player,
                            rectangle2: {...frontOfHome, position: {
                                x: frontOfHome.position.x,
                                y: frontOfHome.position.y + 2
                            }}
                        })
                    ){
                        base = "home"
                        break;
                    }
                }
                
                if(moving) {
                    movable.forEach((movable) => {
                        movable.position.y += 2;
                    })
                }
            }
            else if (keys.s.pressed && lastKey === "s") {
                player.moving = true;
                player.image = player.sprites.down;
                for (let i = 0; i < mapOfCollisions.length; i++) {
                    const boundary = mapOfCollisions[i];
                    if(
                        rectangularCollision({
                            rectangle1: player,
                            rectangle2: {...boundary, position: {
                                x: boundary.position.x,
                                y: boundary.position.y - 2
                            }}
                        })
                    ){
                        moving = false;
                        break;
                    }
                }
                
                if(moving) {
                    movable.forEach((movable) => {
                        movable.position.y -= 2;
                    })
                }
            }
            else if (keys.a.pressed && lastKey === "a") {
                player.moving = true;
                player.image = player.sprites.left;
                for (let i = 0; i < mapOfCollisions.length; i++) {
                    const boundary = mapOfCollisions[i];
                    if(
                        rectangularCollision({
                            rectangle1: player,
                            rectangle2: {...boundary, position: {
                                x: boundary.position.x + 2,
                                y: boundary.position.y
                            }}
                        })
                    ){
                        moving = false;
                        break;
                    }
                }

                if(moving) {
                    movable.forEach((movable) => {
                        movable.position.x += 2;
                    })
                }
            }
            else if (keys.d.pressed && lastKey === "d") {
                player.moving = true;
                player.image = player.sprites.right;
                for (let i = 0; i < mapOfCollisions.length; i++) {
                    const boundary = mapOfCollisions[i];
                    if(
                        rectangularCollision({
                            rectangle1: player,
                            rectangle2: {...boundary, position: {
                                x: boundary.position.x - 2,
                                y: boundary.position.y
                            }}
                        })
                    ){
                        moving = false;
                        break;
                    }
                }

                if(moving) {
                    movable.forEach((movable) => {
                        movable.position.x -= 2;
                    })
                }
            }
        }
    }
    else if(base = "home") {
        c.clearRect(0, 0, canvas.width, canvas.height);
        backgroundHome.draw();
        player.draw();

        player.moving = false;

        if(menuKeys) {
            if (keys.w.pressed && lastKey === "w") {
                player.moving = true;
                player.image = player.sprites.up;
                
                if(moving) {
                    movable.forEach((movable) => {
                        movable.position.y += 2;
                    })
                }
            }
            else if (keys.s.pressed && lastKey === "s") {
                player.moving = true;
                player.image = player.sprites.down;
                
                if(moving) {
                    movable.forEach((movable) => {
                        movable.position.y -= 2;
                    })
                }
            }
            else if (keys.a.pressed && lastKey === "a") {
                player.moving = true;
                player.image = player.sprites.left;

                if(moving) {
                    movable.forEach((movable) => {
                        movable.position.x += 2;
                    })
                }
            }
            else if (keys.d.pressed && lastKey === "d") {
                player.moving = true;
                player.image = player.sprites.right;

                if(moving) {
                    movable.forEach((movable) => {
                        movable.position.x -= 2;
                    })
                }
            }
        }
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

window.addEventListener("blur", function() {
    keys.w.pressed = false;
    keys.a.pressed = false;
    keys.s.pressed = false;
    keys.d.pressed = false;
    lastKey = "";
});

window.addEventListener("focus", function() {
    lastKey = "";
});