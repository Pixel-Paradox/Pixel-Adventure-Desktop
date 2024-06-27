const keys = {
    f: {
        pressed: false
    },
    r: {
        pressed: false
    },
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

let carteKeys = false;

let base = "home";

let nbEnemiesPassed = 0

function animate() {
    window.requestAnimationFrame(animate);

    nbHeart.textContent = heart;
    nbPotionHeart.textContent = PotionHeart;
    nbPotionSpeed.textContent = PotionSpeed;
    nbTopaze.textContent = topaze;
    
    if(menuKeys) {
        carte.classList.remove("active");
        
        carteKeys = false;

        villagers.forEach(villager => {
            villager.sprite.movingVillager = false;
        })

        enemies.forEach(enemy => {
            enemy.sprite.movingEnemy = false;
        })
    }

    let moving = true;

    enemies1.forEach((enemy) => {
        const direction = Math.floor(nbEnemiesPassed / enemy.range) % 2 === 0 ? 1 : -1;
        const distance = (nbEnemiesPassed % enemy.range) * direction;
        const speed = enemy.speed * (20 / enemy.range);

        if (enemy.xy === "x") {
            enemy.sprite.position.x += speed * distance;
        } else if (enemy.xy === "y") {
            enemy.sprite.position.y += speed * distance;
        }

        if (direction > 0) {
            enemy.sprite.image = enemy.sprite.sprites.up;
        } else {
            enemy.sprite.image = enemy.sprite.sprites.down;
        }
        
        enemy.sprite.movingEnemy = true;
        
        nbEnemiesPassed++;
    });

    enemiesMap.forEach(enemy => {
        if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: {...enemy.sprite, position: {
                    x: enemy.sprite.position.x,
                    y: enemy.sprite.position.y
                }}
            })
        ) {
            heartChange(-1)
        }
    });

    if(heart <= 0) {
        diedReprendre = false;

        if (musique) {
            deletSound();
            remplacerMusique(musiqueDied);
        }

        if(topaze == 1) {
            diedTopazeTxt.textContent = "-1 Topaze";
            diedTopaze.style.display = "flex";
        } else 
        if(topaze == 0) {
            diedTopaze.style.display = "none";
        } else {
            diedTopazeTxt.textContent = "-2 Topazes";
            diedTopaze.style.display = "flex";
        }
        died.classList.add("active");
        body.style.cursor = "auto";
        menuKeys = true;

    } else

    if(base === "map") {

        if (musique) {
            remplacerMusique(musiqueMap);
        }
        
        c.clearRect(0, 0, canvas.width, canvas.height);

        backgroundMap.draw();
        player.draw();

        villagersMap.forEach(villager => {
            villager.sprite.draw();
        });

        enemiesMap.forEach(enemy => {
            enemy.sprite.draw();
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

                // Collision

                spritesCollisionsMap.forEach(spriteCollisionsMap => {
                    for (let i = 0; i < mapOfCollisions.length; i++) {
                        const boundary = mapOfCollisions[i];
                        if(
                            rectangularCollision({
                                rectangle1: player,
                                rectangle2: {...boundary, position: {
                                    x: boundary.position.x,
                                    y: boundary.position.y + 2
                                }}
                            }) ||
                            rectangularCollision({
                                rectangle1: player,
                                rectangle2: {...spriteCollisionsMap.sprite, position: {
                                    x: spriteCollisionsMap.sprite.position.x,
                                    y: spriteCollisionsMap.sprite.position.y + 2
                                }}
                            })
                        ){
                            moving = false;
                            player.moving = false;
                            break;
                        }
                    }
                })


                // Villager

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
                        keydialogue(villager);
                    }
                });

                // Home

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
                        base = "home";
                        movable.forEach((movable) => {
                            movable.position.y += 30;
                        })
                        break;
                    }
                }

                if(moving) {
                    movable.forEach((movable) => {
                        movable.position.y += playerSpeed;
                    })
                }
            }

            else if (keys.s.pressed && lastKey === "s") {

                player.moving = true;
                player.image = player.sprites.down;

                // Collision

                spritesCollisionsMap.forEach(spriteCollisionsMap => {
                    for (let i = 0; i < mapOfCollisions.length; i++) {
                        const boundary = mapOfCollisions[i];
                        if(
                            rectangularCollision({
                                rectangle1: player,
                                rectangle2: {...boundary, position: {
                                    x: boundary.position.x,
                                    y: boundary.position.y - 2
                                }}
                            }) ||
                            rectangularCollision({
                                rectangle1: player,
                                rectangle2: {...spriteCollisionsMap.sprite, position: {
                                    x: spriteCollisionsMap.sprite.position.x,
                                    y: spriteCollisionsMap.sprite.position.y - 2
                                }}
                            })
                        ){
                            moving = false;
                            player.moving = false;
                            break;
                        }
                    }
                })

                if(moving) {
                    movable.forEach((movable) => {
                        movable.position.y -= playerSpeed;
                    })
                }
            }

            else if (keys.a.pressed && lastKey === "a") {

                player.moving = true;
                player.image = player.sprites.left;

                //Collision

                spritesCollisionsMap.forEach(spriteCollisionsMap => {
                    for (let i = 0; i < mapOfCollisions.length; i++) {
                        const boundary = mapOfCollisions[i];
                        if(
                            rectangularCollision({
                                rectangle1: player,
                                rectangle2: {...boundary, position: {
                                    x: boundary.position.x + 2,
                                    y: boundary.position.y
                                }}
                            }) ||
                            rectangularCollision({
                                rectangle1: player,
                                rectangle2: {...spriteCollisionsMap.sprite, position: {
                                    x: spriteCollisionsMap.sprite.position.x + 2,
                                    y: spriteCollisionsMap.sprite.position.y
                                }}
                            })
                        ){
                            moving = false;
                            player.moving = false;
                            break;
                        }
                    }
                })

                if(moving) {
                    movable.forEach((movable) => {
                        movable.position.x += playerSpeed;
                    })
                }
            }

            else if (keys.d.pressed && lastKey === "d") {

                player.moving = true;
                player.image = player.sprites.right;

                // Collision

                spritesCollisionsMap.forEach(spriteCollisionsMap => {
                    for (let i = 0; i < mapOfCollisions.length; i++) {
                        const boundary = mapOfCollisions[i];
                        if(
                            rectangularCollision({
                                rectangle1: player,
                                rectangle2: {...boundary, position: {
                                    x: boundary.position.x - 2,
                                    y: boundary.position.y
                                }}
                            }) ||
                            rectangularCollision({
                                rectangle1: player,
                                rectangle2: {...spriteCollisionsMap.sprite, position: {
                                    x: spriteCollisionsMap.sprite.position.x - 2,
                                    y: spriteCollisionsMap.sprite.position.y
                                }}
                            })
                        ){
                            moving = false;
                            player.moving = false;
                            break;
                        }
                    }
                })

                if(moving) {
                    movable.forEach((movable) => {
                        movable.position.x -= playerSpeed;
                    })
                }
            }
        }
    } else
    
    if(base === "home") {

        if (musique) {
            remplacerMusique(musiqueHome);
        }

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

                // Collision

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

                // Villager

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
                        movable.position.y += playerSpeed;
                    })
                }
            }
            else if (keys.s.pressed && lastKey === "s") {

                player.moving = true;
                player.image = player.sprites.down;

                // Collision

                villagersHome.forEach(villager => {
                    for (let i = 0; i < homeOfCollisions.length; i++) {
                        const boundary = homeOfCollisions[i];
                        if(
                            rectangularCollision({
                                rectangle1: player,
                                rectangle2: {...boundary, position: {
                                    x: boundary.position.x,
                                    y: boundary.position.y - 2
                                }}
                            }) || 
                            rectangularCollision({
                                rectangle1: player,
                                rectangle2: {...villager.sprite, position: {
                                    x: villager.sprite.position.x,
                                    y: villager.sprite.position.y - 2
                                }}
                            })
                        ){
                            moving = false;
                            player.moving = false;
                            break;
                        }
                    }
                })

                // Home
                
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
                        movable.position.y -= playerSpeed;
                    })
                }
            } else
            
            if (keys.a.pressed && lastKey === "a") {

                player.moving = true;
                player.image = player.sprites.left;

                // Collision

                villagersHome.forEach(villager => {
                    for (let i = 0; i < homeOfCollisions.length; i++) {
                        const boundary = homeOfCollisions[i];
                        if(
                            rectangularCollision({
                                rectangle1: player,
                                rectangle2: {...boundary, position: {
                                    x: boundary.position.x + 2,
                                    y: boundary.position.y
                                }}
                            }) ||                         
                            rectangularCollision({
                                rectangle1: player,
                                rectangle2: {...villager.sprite, position: {
                                    x: villager.sprite.position.x + 2,
                                    y: villager.sprite.position.y
                                }}
                            })
                        ){
                            moving = false;
                            player.moving = false;
                            break;
                        }
                    }
                })

                if(moving) {
                    movable.forEach((movable) => {
                        movable.position.x += playerSpeed;
                    })
                }
            } else
            
            if (keys.d.pressed && lastKey === "d") {

                player.moving = true;
                player.image = player.sprites.right;

                // Collision

                villagersHome.forEach(villager => {
                    for (let i = 0; i < homeOfCollisions.length; i++) {
                        const boundary = homeOfCollisions[i];
                        if(
                            rectangularCollision({
                                rectangle1: player,
                                rectangle2: {...boundary, position: {
                                    x: boundary.position.x - 2,
                                    y: boundary.position.y
                                }}
                            }) ||                         
                            rectangularCollision({
                                rectangle1: player,
                                rectangle2: {...villager.sprite, position: {
                                    x: villager.sprite.position.x - 2,
                                    y: villager.sprite.position.y
                                }}
                            })
                        ){
                            moving = false;
                            player.moving = false;
                            break;
                        }
                    }
                })

                if(moving) {
                    movable.forEach((movable) => {
                        movable.position.x -= playerSpeed;
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
        case "f":
            keys.f.pressed = true;
            lastKey = "f";

            if(!menuKeys){
                if(PotionSpeed > 0 && playerSpeed === 2) {
                    playerSpeed = 3;
                    setTimeout(function() {
                        playerSpeed = 2;
                    }, 10000);
                    potionSpeedChange(-1);
                }
            }

            break;
        case "r":
            keys.r.pressed = true;
            lastKey = "r";

            if(!menuKeys){
                if(PotionHeart > 0 && heart < heartMax) {
                    heartChange(heartMax);
                    potionHeartChange(-1);
                }
            }

            break;
        case "e":
            keys.e.pressed = true;
            lastKey = "e";

            if(!menuKeys){
                if (chefDialogue !== 0) {
                    carte.classList.toggle("active");
                    carteKeys = carte.classList.contains('active');
                    carte.innerHTML = carteAmarantis;
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
        case "f":
            keys.f.pressed = false;
            break;
        case "r":
            keys.r.pressed = false;
            break;
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