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

const offset = {
    x: -1630,
    y: -880
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

function rectangularCollision({rectangle1, rectangle2}) {
    return(
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}