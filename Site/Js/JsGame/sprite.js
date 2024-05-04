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

const vagabondImage = new Image();
vagabondImage.src = './Site/ImageGame/vagabond.png';

const ragnerusImage = new Image();
ragnerusImage.src = './Site/ImageGame/ragnerus.png';

const chefImage = new Image();
chefImage.src = './Site/ImageGame/chef.png';

const dogImage = new Image();
dogImage.src = './Site/ImageGame/dog.png';

const voyageurImage = new Image();
voyageurImage.src = './Site/ImageGame/voyageur.png';

const georasImage = new Image();
georasImage.src = './Site/ImageGame/voyageur.png';

// Map image

const mapBackground = new Image();
mapBackground.src = './Site/ImageGame/map.png';

const mapForeground = new Image();
mapForeground.src = './Site/ImageGame/mapForeground.png';

// Houses image 

const homeBackground = new Image();
homeBackground.src = './Site/ImageGame/home.png';

const homeForeground = new Image();
homeForeground.src = './Site/ImageGame/homeForeground.png';

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
        negHeart: player1,
        posHeart: player2
    }
})

// Pnj creation

const vagabond = {
    sprite: new Sprite({
        position: {
            x: canvas.width / 2 + 35,
            y: canvas.height / 2 - 25
        },
        frames: {
            max: 4
        },
        image: vagabondImage
    }),
};

const chef = {
    sprite: new Sprite({
        position: {
            x: canvas.width / 2 + 155,
            y: canvas.height / 2 + 390
        },
        frames: {
            max: 4
        },
        image: chefImage
    }),
};

const georas = {
    sprite: new Sprite({
        position: {
            x: canvas.width / 2 - 250,
            y: canvas.height / 2 + 950
        },
        frames: {
            max: 4
        },
        image: georasImage
    }),
};





const ragnerus = {
    sprite: new Sprite({
        position: {
            x: canvas.width / 2 + 195,
            y: canvas.height / 2 + 195
        },
        frames: {
            max: 4
        },
        image: ragnerusImage
    }),
};

const dog = {
    sprite: new Sprite({
        position: {
            x: canvas.width / 2 - 5,
            y: canvas.height / 2 - 710
        },
        frames: {
            max: 4
        },
        image: dogImage
    }),
};

const voyageur = {
    sprite: new Sprite({
        position: {
            x: canvas.width / 2 - 200,
            y: canvas.height / 2 + 750
        },
        frames: {
            max: 4
        },
        image: voyageurImage
    }),
};

/*
const villager1 = {
    sprite: new Sprite({
        position: {
            x: canvas.width / 2 + 90,
            y: canvas.height / 2 + 20
        },
        frames: {
            max: 4
        },
        image: villagerImage1
    }),
};

const villager1 = {
    sprite: new Sprite({
        position: {
            x: canvas.width / 2 + 90,
            y: canvas.height / 2 + 20
        },
        frames: {
            max: 4
        },
        image: villagerImage1
    }),
};

const villager1 = {
    sprite: new Sprite({
        position: {
            x: canvas.width / 2 + 90,
            y: canvas.height / 2 + 20
        },
        frames: {
            max: 4
        },
        image: villagerImage1
    }),
};

const villager1 = {
    sprite: new Sprite({
        position: {
            x: canvas.width / 2 + 90,
            y: canvas.height / 2 + 20
        },
        frames: {
            max: 4
        },
        image: villagerImage1
    }),
};

const villager1 = {
    sprite: new Sprite({
        position: {
            x: canvas.width / 2 + 90,
            y: canvas.height / 2 + 20
        },
        frames: {
            max: 4
        },
        image: villagerImage1
    }),
};

const villager1 = {
    sprite: new Sprite({
        position: {
            x: canvas.width / 2 + 90,
            y: canvas.height / 2 + 20
        },
        frames: {
            max: 4
        },
        image: villagerImage1
    }),
};*/

const enemyImages = [];

const enemyPositions = [
    { x: -800, y: 530 },
    { x: -1200, y: -690 }
];

for (let i = 0; i < enemyPositions.length; i++) {
    const enemyImage = new Image();
    enemyImage.src = './Site/ImageGame/vagabond.png';
    enemyImages.push(enemyImage);
}

const enemies = [];

for (let i = 0; i < enemyPositions.length; i++) {
    const enemy = {
        sprite: new Sprite({
            position: {
                x: canvas.width / 2 + enemyPositions[i].x,
                y: canvas.height / 2 + enemyPositions[i].y
            },
            frames: {
                max: 4
            },
            image: enemyImages[i]
        })
    };
    enemies.push(enemy);
}

const villagersMap = [ragnerus, dog, voyageur, ...enemies];
const villagersHome = [vagabond , chef, georas];

const villagers = [...villagersMap, ...villagersHome];

const villagersMovable = villagers.map(villager => villager.sprite);

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

const foregroundHome = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: homeForeground
})

const movable = [backgroundMap , foregroundMap, ...mapOfCollisions,
    ...frontOfHomes, ...villagersMovable,
    backgroundHome, foregroundHome, ...homeOfCollisions];