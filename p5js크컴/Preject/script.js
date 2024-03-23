let img;

function preload() {
    img = loadImage('./sia.png');

}
function setup() {
    createCanvas(img.weight, img.height);
    background(100);

}

function draw() {
    image(img, 0, 0);
}
