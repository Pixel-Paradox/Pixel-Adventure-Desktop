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

// Pnj creation

const vagabond = {
    sprite: new Sprite({
        position: {
            x: canvas.width / 2 + 50,
            y: canvas.height / 2 + 20
        },
        frames: {
            max: 4
        },
        image: vagabondImage
    }),
};





const ragnerus = {
    sprite: new Sprite({
        position: {
            x: canvas.width / 2 + 200,
            y: canvas.height / 2 + 200
        },
        frames: {
            max: 4
        },
        image: ragnerusImage
    }),
};

const chef = {
    sprite: new Sprite({
        position: {
            x: canvas.width / 2 + 230,
            y: canvas.height / 2 + 420
        },
        frames: {
            max: 4
        },
        image: chefImage
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

const villagersMap = [ragnerus];
const villagersHome = [vagabond , chef];

const villagers = [vagabond ,ragnerus, chef];

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


const movable = [backgroundMap , foregroundMap, ...mapOfCollisions,
    ...frontOfHomes, ...villagersMovable,
    backgroundHome, ...homeOfCollisions];