function setup() {
    createCanvas(100, 100);
    strokeWeight(8);
}
function draw() {
    background(204);
    line(mouseX, mouseY, pmouseX, pmouseY);
}