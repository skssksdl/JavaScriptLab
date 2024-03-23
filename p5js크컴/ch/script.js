let img;

function preload() {

    img = loadImage('./sia.png');
}
function setup() {
    createCanvas(img.width, img.height);
    background(0);
}

function draw() {
    image(img, 0, 0);
}