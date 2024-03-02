/*if (window.location.protocol != "https:") {
    window.location.protocol="https:";
}*/

document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
if(menuKeys) {
    const collisionsMap = [];

    for (let i = 0; i < collisions.length; i += 150) {
        collisionsMap.push(collisions.slice(i, 150 + i));
    }
    const t = 16
    class Boundary {
        static width = t;
        static height = t;
        constructor({position}) {
            this.position = position;
            this.width = t;
            this.height = t;
        }

        draw() {
            c.fillStyle = "rgba(255, 0, 0, 0)"
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
            if (symbol === 1026) {
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
    playerImage.src = 'player1.png';

    class Sprite {
        constructor({position, velocity, image, frames = {max: 1} }) {
            this.position = position;
            this.image = image;
            this.frames = frames;

            this.image.onload = () => {
                this.width = this.image.width / this.frames.max;
                this.height = this.image.height;
            };        
        }

        draw() {
            c.drawImage(
                this.image,
                0,
                0,
                this.image.width / this.frames.max,
                this.image.height,
                this.position.x,
                this.position.y,
                this.image.width / this.frames.max,
                this.image.height
            );
        }
    }

    const player = new Sprite({
        position: {
            x: canvas.width / 2 - 15,
            y: canvas.height / 2 - 15
        },
        image: playerImage,
        frames: {
            max: 4
        }
    })

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

    const movable = [background, ...boundaries]; 

    function rectangularCollision({rectangle1, rectangle2}) {
        return(
            rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
            rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
            rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
            rectangle1.position.y + rectangle1.height >= rectangle2.position.y
        )
    }

    function animate() {
        window.requestAnimationFrame(animate);
        background.draw();
        boundaries.forEach(boundary =>{
            boundary.draw()
        })
        player.draw();

        let moving = true;

        if(menuKeys) {
            if (keys.w.pressed && lastKey === "w") {
                for (let i = 0; i < boundaries.length; i++) {
                    const boundary = boundaries[i];
                    if(
                        rectangularCollision({
                            rectangle1: player,
                            rectangle2: {...Boundary, position: {
                                x: boundary.position.x,
                                y: boundary.position.y + 2
                            }}
                        })
                    ){
                        moving = false;
                        break;
                    }
                }
                
                if(moving) {
                    movable.forEach((movable) => {
                        movable.position.y += 2;
                    })
                }
            }
            else if (keys.a.pressed && lastKey === "a") {
                for (let i = 0; i < boundaries.length; i++) {
                    const boundary = boundaries[i];
                    if(
                        rectangularCollision({
                            rectangle1: player,
                            rectangle2: {...Boundary, position: {
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
            else if (keys.s.pressed && lastKey === "s") {
                for (let i = 0; i < boundaries.length; i++) {
                    const boundary = boundaries[i];
                    if(
                        rectangularCollision({
                            rectangle1: player,
                            rectangle2: {...Boundary, position: {
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
            else if (keys.d.pressed && lastKey === "d") {
                for (let i = 0; i < boundaries.length; i++) {
                    const boundary = boundaries[i];
                    if(
                        rectangularCollision({
                            rectangle1: player,
                            rectangle2: {...Boundary, position: {
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
}