/*if (window.location.protocol != "https:") {
    window.location.protocol="https:";
}*/

document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});

const body = document.querySelector("body");
const menu = document.querySelector(".menu");
const reprendre = document.querySelector(".reprendre");
const inputSizes = document.querySelectorAll(".inputSize");
const ecran = document.querySelector(".ecran");

let menuKeys = false;

document.addEventListener('keydown', function(event) {
    if (event.keyCode === 81) {
        menu.classList.toggle("active");
        
        menuKeys = menu.classList.contains('active');

        body.style.cursor = menu.classList.contains('active') ? "default" : "none";
    } 
});

reprendre.onclick = function() {
    menu.classList.remove("active");
    body.style.cursor = "none";
    menuKeys = menu.classList.contains('active');
};

inputSizes.forEach((input, index) => {
    input.maxLength = 3;

    input.addEventListener('input', function() {
        let value = parseInt(this.value);
        
        if (this.value.length > 3) {
            this.value = this.value.slice(0, 3)
            value = parseInt(this.value);
        }

        if (value > 100) {
            value = 100;
        }
 
        if (value < 1) {
            value = 1;
        }

        localStorage.setItem(index === 0 ? "canvasWidth" : "canvasHeight", value.toString());
        
        if (index === 0) {
            canvas.style.width = `${value}vw`;
        } else {
            canvas.style.height = `${value}vh`;
        }
    });
});

window.addEventListener('DOMContentLoaded', function() {
    const storedWidth = localStorage.getItem("canvasWidth");
    const storedHeight = localStorage.getItem("canvasHeight");
    
    if (!storedWidth) {
        inputSizes[0].value = 100;
        canvas.style.width = "100vw";
        localStorage.setItem("canvasWidth", "100");
    } else {
        inputSizes[0].value = storedWidth;
        canvas.style.width = `${storedWidth}vw`;
    }
    
    if (!storedHeight) {
        inputSizes[1].value = 100;
        canvas.style.height = "100vh";
        localStorage.setItem("canvasHeight", "100");
    } else {
        inputSizes[1].value = storedHeight;
        canvas.style.height = `${storedHeight}vh`;
    }
});

function limitNumberLength(inputSizes, maxLength) {
    if (inputSizes.value.length > maxLength) {
        inputSizes.value = input.value.slice(0, maxLength);
    }
}

let pleinEcranActif = false;

ecran.onclick = function() {
    if (!pleinEcranActif) {
        enterFullscreen();
        pleinEcranActif = true;
        ecran.textContent = "Enlever le plein écran";
    } else {
        exitFullscreen();
        pleinEcranActif = false;
        ecran.textContent = "Plein écran";
    }
};

function enterFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}