if (window.location.protocol != "https:") {
    window.location.protocol="https:";
}

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = 'map.png';

const playerImage = new Image();
playerImage.src = 'player.png';

image.onload = function() {
    c.drawImage(image, -100, -200);
    const scale = 10;
    const newWidth = playerImage.width / scale;
    const newHeight = playerImage.height / scale;
    c.drawImage(
        playerImage,
        canvas.width / 2 - newWidth / 2,
        canvas.height / 2 - newHeight / 2,
        newWidth,
        newHeight
    );
};

document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});