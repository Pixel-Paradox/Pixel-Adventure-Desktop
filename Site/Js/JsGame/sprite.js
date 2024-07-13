function createVillagerTest(path1, path2, path3, path4, path5, x, y) {
    const villagerTestImage1 = new Image();
    villagerTestImage1.src = path1;
    const villagerTestImage2 = new Image();
    villagerTestImage2.src = path2;
    const villagerTestImage3 = new Image();
    villagerTestImage3.src = path3;
    const villagerTestImage4 = new Image();
    villagerTestImage4.src = path4;
    const villagerTestImage5 = new Image();
    villagerTestImage5.src = path5;
    
    return {
        sprite: new Sprite({
            position: {
                x: canvas.width / 2 + x,
                y: canvas.height / 2 + y
            },
            frames: {
                max: 4
            },
            image: villagerTestImage5,
            sprites: {
                up: villagerTestImage2,
                down: villagerTestImage1,
                left: villagerTestImage4,
                right: villagerTestImage3
            }
        })
    };
}

// Player

const player = createVillagerTest('./Site/ImageGame/Sprites/player1.png', './Site/ImageGame/Sprites/player2.png', './Site/ImageGame/Sprites/player3.png', './Site/ImageGame/Sprites/player4.png', './Site/ImageGame/Sprites/player1.png', -10, -16.1);

// Villageois principale

const vagabond = createVillagerTest('./Site/ImageGame/Sprites/vagabond1.png', './Site/ImageGame/Sprites/vagabond2.png', './Site/ImageGame/Sprites/vagabond3.png', './Site/ImageGame/Sprites/vagabond4.png', './Site/ImageGame/Sprites/vagabond4.png', +40, +40);



function createVillager(path, x, y) {
    const villagerImage = new Image();
    villagerImage.src = path;
    
    return {
        sprite: new Sprite({
            position: {
                x: canvas.width / 2 + x,
                y: canvas.height / 2 + y
            },
            frames: {
                max: 4
            },
            image: villagerImage
        })
    };
}

// Villageois principale

const chef = createVillager('./Site/ImageGame/chef.png', +155, +390);
const voyageur = createVillager('./Site/ImageGame/voyageur.png', -200, +750);
const georas = createVillager('./Site/ImageGame/georas.png', -250, +950);

// Villageois secondaire

const ragnerus = createVillager('./Site/ImageGame/ragnerus.png', +195, +195);
const dog = createVillager('./Site/ImageGame/dog.png', -5, -710);
const hylda = createVillager('./Site/ImageGame/voyageur.png', +120, +1050);
const librarian = createVillager('./Site/ImageGame/voyageur.png', +120, +1050);




function createBook(x, y) {
    const bookImage = new Image();
    bookImage.src = './Site/ImageGame/Sprites/book.png';
    
    return {
        sprite: new Sprite({
            position: {
                x: canvas.width / 2 + x,
                y: canvas.height / 2 + y
            },
            frames: {
                max: 4
            },
            image: bookImage
        })
    };
}

const book1 = createBook(+50, +10);
const book2 = createBook(+ 90, +70);





let villagersMap = [ragnerus, dog, voyageur, hylda, book2];
let villagersHome = [vagabond , chef, georas, librarian, book1,];
const villagers = [...villagersMap, ...villagersHome];
const villagersMovable = villagers.map(villager => villager.sprite);

// Enemies creation
const enemyImages = [
    ["./Site/ImageGame/Sprites/goat3.png", "./Site/ImageGame/Sprites/goat4.png"],
    ["./Site/ImageGame/Sprites/goat1.png", "./Site/ImageGame/Sprites/goat2.png"],
    ["./Site/ImageGame/Sprites/goat3.png", "./Site/ImageGame/Sprites/goat4.png"],
    ["./Site/ImageGame/Sprites/goat3.png", "./Site/ImageGame/Sprites/goat4.png"],
    ["./Site/ImageGame/Sprites/goat1.png", "./Site/ImageGame/Sprites/goat2.png"],
    ["./Site/ImageGame/Sprites/goat1.png", "./Site/ImageGame/Sprites/goat2.png"]
];

const enemyPositions = [
    { x: 180, y: -230 },
    { x: 360, y: -430 },
    { x: -50, y: -430 },
    { x: -600, y: -800 },
    { x: 100, y: -730 },
    { x: -90, y: -930 },
];

const enemySpeeds = [0.2, 0.07, 0.1, 0.4, 0.07, 0.06];
const enemyRanges = [600, 550, 690, 500, 900, 550];
const enemyXY = ["x", "y", "x", "x", "y", "y"];

const enemies1 = [];

function createEnemy(position, images, speed, range, xy) {
    const [image1, image2] = images.map(src => {
        const img = new Image();
        img.src = src;
        return img;
    });

    return {
        sprite: new Sprite({
            position: {
                x: canvas.width / 2 + position.x,
                y: canvas.height / 2 + position.y
            },
            frames: { 
                max: 4 
            },
            image: image1,
            sprites: { 
                up: image1, 
                down: image2 
            },
        }),
        speed: speed,
        range: range,
        xy: xy
    };
}

for (let i = 0; i < enemyPositions.length; i++) {
    const enemy = createEnemy(enemyPositions[i], enemyImages[i], enemySpeeds[i], enemyRanges[i], enemyXY[i]);
    enemies1.push(enemy);
}



let enemiesMap = [...enemies1];
const enemies = [...enemiesMap];
const enemiesMovable = enemies.map(enemy => enemy.sprite);


const spritesCollisionsMap = [...enemiesMap, ...villagersMap];
const spritesCollisionsHome = [...villagersHome];



function createBg(path) {
    const bgImage = new Image();
    bgImage.src = path;
    
    return new Sprite ({
        position: {
            x: offset.x,
            y: offset.y
        },
        image: bgImage
    });
}

// Background

const backgroundMap = createBg('./Site/ImageGame/map.png');
const foregroundMap = createBg('./Site/ImageGame/mapForeground.png');
const backgroundHome = createBg('./Site/ImageGame/home.png');
const foregroundHome = createBg('./Site/ImageGame/homeForeground.png');


const movable = [backgroundMap , foregroundMap, ...mapOfCollisions,
    ...frontOfHomes, ...villagersMovable, ...enemiesMovable,
    backgroundHome, foregroundHome, ...homeOfCollisions];