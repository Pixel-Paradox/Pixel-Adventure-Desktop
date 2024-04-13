const nbTopaze = document.querySelector(".nbTopaze");

let topaze = 0;

function topazeChange(topazeLess) {
    topaze += topazeLess;

    if(topaze <= 0) {
        topaze = 0;
    }    
}