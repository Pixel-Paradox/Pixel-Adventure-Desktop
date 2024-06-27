const progressBar = document.querySelector(".progressBar:nth-child(1)");
const progressScore = document.querySelector(".progressScore");

let progress = 0;

function progressChange(progressLess) {
    progress += progressLess;
    const progressInPixels = (progress / 100) * 350;
    
    if(progress <= 100) {
        progressBar.style.width = progressInPixels + "px";
        progressScore.textContent = progress;
    }
}