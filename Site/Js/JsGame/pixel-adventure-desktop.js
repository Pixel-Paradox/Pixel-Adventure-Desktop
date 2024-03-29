// Canvas creation

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
c.imageSmoothingEnabled = true;

const dialogue = document.querySelector(".dialogue");
const text = document.querySelector(".text");
const username = document.querySelector(".name");

// Hang Tiled data

function splitArrayIntoChunks(array) {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += 150) {
        chunkedArray.push(array.slice(i, 150 + i));
    }
    return chunkedArray;
}

const mapCollisions = splitArrayIntoChunks(collisionsMap);
const homeCollisions = splitArrayIntoChunks(collisionsHome);

const homeFront = splitArrayIntoChunks(frontHome);

let offset = {
    x: -35,
    y: -35
};

const mapOfCollisions = [];
const homeOfCollisions = [];

const frontOfHomes = [];

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
createBoundariesFromArray(homeCollisions, homeOfCollisions);

createBoundariesFromArray(homeFront, frontOfHomes);

// Player image

const player1 = new Image();
player1.src = './Site/ImageGame/player1.png';

const player2 = new Image();
player2.src = './Site/ImageGame/player2.png';

const player3 = new Image();
player3.src = './Site/ImageGame/player3.png';

const player4 = new Image();
player4.src = './Site/ImageGame/player4.png';

// Villager image

const villager1 = new Image();
villager1.src = './Site/ImageGame/villager1.png';

const villager2 = new Image();
villager2.src = './Site/ImageGame/player1.png';
// Map image

const mapBackground = new Image();
mapBackground.src = './Site/ImageGame/map.png';

const mapForeground = new Image();
mapForeground.src = './Site/ImageGame/foreground.png';

// Houses image 

const homeBackground = new Image();
homeBackground.src = './Site/ImageGame/home.png';

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

const Albert = {
    sprite: new Sprite({
        position: {
            x: canvas.width / 2 + 90,
            y: canvas.height / 2 + 20
        },
        frames: {
            max: 4
        },
        image: villager1
    })
};

const Francois = {
    sprite: new Sprite({
        position: {
            x: canvas.width / 2 - 30,
            y: canvas.height / 2 + 30
        },
        frames: {
            max: 4
        },
        image: villager2
    })
};

const villagers = [Albert, Francois];

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
const villagersMovable = villagers.map(villager => villager.sprite);

const movable = [backgroundMap , foregroundMap, ...villagersMovable, ...mapOfCollisions, ...frontOfHomes,
     backgroundHome, ...homeOfCollisions];
 
function rectangularCollision({rectangle1, rectangle2}) {
    return(
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

let timeoutVillager;
let currentSegment = 0;

function keydialogue(villager) {
    clearTimeout(timeoutVillager);
    if (villager === Albert) {
        villager.sprite.b = true
        dialogueFunction("Albert", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaxbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbxcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccxdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddx");
    } else if (villager === Francois) {
        villager.sprite.b = true
        dialogueFunction("Francois", "Bonjour!");
    }
}

function dialogueFunction(usernames, texts) {
    username.textContent = usernames;
    let time = 3000;
    let segmentLength = 200;
    let a = Math.ceil(texts.length / segmentLength);

    function displaySegment() {
        let start = currentSegment * segmentLength;
        let end = Math.min((currentSegment + 1) * segmentLength, texts.length);

        text.textContent = texts.substring(start, end);
        
        currentSegment++;

        if (currentSegment < a) {
            timeoutVillager = setTimeout(displaySegment, time);
        } else {
            timeoutVillager = setTimeout(function() {
                villagers.forEach(villager => {
                villager.sprite.b = false
                })
                dialogue.classList.remove("active");
            }, time);
        }
    }

    currentSegment = 0;
    displaySegment();

    dialogue.classList.add("active");
}

let base = "map";

function animate() {
    window.requestAnimationFrame(animate);
    let moving = true;

    if(base === "map") {

        c.clearRect(0, 0, canvas.width, canvas.height);

        backgroundMap.draw();
        player.draw();
        villagers.forEach(villager => {
            villager.sprite.draw();
        });
        foregroundMap.draw();

        player.moving = false;

        mapOfCollisions.forEach(mapOfCollision => {
            mapOfCollision.draw()
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
                        player.moving = false;
                        break;
                    }
                }

                villagers.forEach(villager => {
                    if (
                        rectangularCollision({
                            rectangle1: player,
                            rectangle2: {...villager.sprite, position: {
                                x: villager.sprite.position.x,
                                y: villager.sprite.position.y + 2
                            }}
                        })
                    ) {
                        
                        moving = false;
                        player.moving = false;

                        keydialogue(villager);
                    }
                });

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
                        movable.forEach((movable) => {
                            movable.position.y += 30;
                        })
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
                        player.moving = false;
                        break;
                    }
                }

                villagers.forEach(villager => {
                    if (
                        rectangularCollision({
                            rectangle1: player,
                            rectangle2: {...villager.sprite, position: {
                                x: villager.sprite.position.x,
                                y: villager.sprite.position.y - 2
                            }}
                        })
                    ) {
                        
                        moving = false;
                        player.moving = false;
                    }
                });

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
                        player.moving = false;
                        break;
                    }
                }

                villagers.forEach(villager => {
                    if (
                        rectangularCollision({
                            rectangle1: player,
                            rectangle2: {...villager.sprite, position: {
                                x: villager.sprite.position.x + 2,
                                y: villager.sprite.position.y
                            }}
                        })
                    ) {
                        
                        moving = false;
                        player.moving = false;
                    }
                });

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
                        player.moving = false;
                        break;
                    }
                }

                villagers.forEach(villager => {
                    if (
                        rectangularCollision({
                            rectangle1: player,
                            rectangle2: {...villager.sprite, position: {
                                x: villager.sprite.position.x - 2,
                                y: villager.sprite.position.y
                            }}
                        })
                    ) {
                        
                        moving = false;
                        player.moving = false;
                    }
                });

                if(moving) {
                    movable.forEach((movable) => {
                        movable.position.x -= 2;
                    })
                }
            }
        }
    }
    else if(base === "home") {
        c.clearRect(0, 0, canvas.width, canvas.height);

        backgroundHome.draw();
        player.draw();

        player.moving = false;

        homeOfCollisions.forEach(homeOfCollision => {
            homeOfCollision.draw()
        });
        frontOfHomes.forEach(frontOfHome => {
            frontOfHome.draw()
        });

        if(menuKeys) {
            if (keys.w.pressed && lastKey === "w") {
                player.moving = true;
                player.image = player.sprites.up;
                for (let i = 0; i < homeOfCollisions.length; i++) {
                    const boundary = homeOfCollisions[i];
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
                        player.moving = false;
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
                for (let i = 0; i < homeOfCollisions.length; i++) {
                    const boundary = homeOfCollisions[i];
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
                        player.moving = false;
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
                        base = "map"
                        movable.forEach((movable) => {
                            movable.position.y -= 25;
                        })
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
                for (let i = 0; i < homeOfCollisions.length; i++) {
                    const boundary = homeOfCollisions[i];
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
                        player.moving = false;
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
                for (let i = 0; i < homeOfCollisions.length; i++) {
                    const boundary = homeOfCollisions[i];
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
                        player.moving = false;
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
}
animate()

let lastKey = "";

window.addEventListener("keydown", function(e) {
    switch (e.key) {
        case "w":
            keys.w.pressed = true;
            lastKey = "w";
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