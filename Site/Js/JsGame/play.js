const keys = {
    e: {
        pressed: false
    },
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

let base = "home";

function animate() {
    window.requestAnimationFrame(animate);

    if(menuKeys) {
        dialogue.classList.remove("active");
        carte.classList.remove("active");
        
        carteKeys = false;

        villagers.forEach(villager => {
            villager.sprite.movingVillager = false;
        })
    }

    let moving = true;

    if(base === "map") {

        c.clearRect(0, 0, canvas.width, canvas.height);

        backgroundMap.draw();
        player.draw();

        villagersMap.forEach(villager => {
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

        if(!menuKeys && !carteKeys) {
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

                villagersMap.forEach(villager => {
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

                villagersMap.forEach(villager => {
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

                villagersMap.forEach(villager => {
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

                villagersMap.forEach(villager => {
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

        villagersHome.forEach(villager => {
            villager.sprite.draw();
        });

        foregroundHome.draw();

        player.moving = false;

        homeOfCollisions.forEach(homeOfCollision => {
            homeOfCollision.draw()
        });

        frontOfHomes.forEach(frontOfHome => {
            frontOfHome.draw()
        });
        
        if(!menuKeys && !carteKeys) {
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

                villagersHome.forEach(villager => {
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

                villagersHome.forEach(villager => {
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

                villagersHome.forEach(villager => {
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

                villagersHome.forEach(villager => {
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
}
animate()

let lastKey = "";

window.addEventListener("keydown", function(e) {
    switch (e.key) {
        case "e":
            keys.e.pressed = true;
            lastKey = "e";

            if(!menuKeys){
                if (map && lastKey === "e") {
                    carte.classList.toggle("active");
                    carteKeys = carte.classList.contains('active');
                }
            }

            break;
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
        case "e":
            keys.e.pressed = false;
            break;
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