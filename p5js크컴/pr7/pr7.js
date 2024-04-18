let unit = 20;
let cols, rows;


function setup() {
    createCanvas(400, 400);
    background(0);
    cols = width / unit*2;
    rows = height / unit*2;
}

function draw() {
    background(220);
    frameRate(20)
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {

            let cx = i * unit + unit / 2;
            let cy = j * unit + unit / 2;

            let r = random(0, 255);
            let g = random(0, 255);
            let b = random(0, 255);

            let d = dist(cx, cy, mouseX, mouseY);

            if (d < unit * 7) {
                fill("red");
            } else {
                fill(r, 0, b);
            }

            circle(cx, cy, d/700*r);
        }
    }
}
