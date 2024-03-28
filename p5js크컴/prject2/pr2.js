let x, y;
x = 0;
y = 0;

let w = 5;
let p = 0.5;

function setup() {
    createCanvas(400, 400);
    background(255);
}
function draw() {

    let r = random(128, 255)
    let g = random(128, 255)
    let b = random(128, 255)
    stroke(r, g, b);


    if (random() > p) {
        line(x, y, x+w, y+w);

    } else {
        line(x, y+w, x+w, y);
    }

    x = x + w;

    if (x > width) {
        y = y + w;
        x = 0;
    }

    if (y > height) {
        background(0);
        x = 0;
        y = 0;
    }
}