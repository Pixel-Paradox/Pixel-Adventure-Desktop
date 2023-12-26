const menu = document.querySelector(".menu");
const reprendre = document.querySelector(".reprendre");
const inputSizes = document.querySelectorAll(".inputSize");
const ecran = document.querySelector(".ecran");


document.addEventListener('keydown', function(event) {
    if (event.keyCode === 81) {
        menu.classList.toggle("active");
    }
});

reprendre.onclick = function() {
    menu.classList.remove("active");
};

inputSizes.forEach((input, index) => {
    input.addEventListener('input', function() {
        let value = parseInt(this.value);
        
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
    
    if (storedWidth) {
        canvas.style.width = `${storedWidth}vw`;
    }
    
    if (storedHeight) {
        canvas.style.height = `${storedHeight}vh`;
    }
});

let pleinEcranActif = false;

ecran.onclick = function() {
    if (!pleinEcranActif) {
        enterFullscreen();
        pleinEcranActif = true;
        ecran.textContent = "Enlever le plein écran";
    } else {
        exitFullscreen();
        pleinEcranActif = false;
        ecran.textContent = "plein écran";
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