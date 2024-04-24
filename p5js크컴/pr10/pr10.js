let unit = 100;
let cols, rows;

let actRandomSeed = 0;

function setup() {

    createCanvas(400, 400);
    background(255);
    cols = width/unit;
    rows = height/unit;

}

function draw() {

    randomSeed(actRandomSeed);

    translate(-unit/2, -unit/2);
    background(0);

    for (let i=0; i<cols; i++) {
        for (let j=0; j<rows; j++) {

            let cx = i*unit + unit/2;
            let cy = j*unit + unit/2;
            CC(cx, cy, unit, 3, 'yellow', 'pink');

        }
    }

}

function CC(x, y, d, thickness, fc, col) {


    stroke(col);
    strokeWeight(thickness);
    fill(fc);

    // console.log(dice)

    if (actRandomSeed > 50000) {
        circle(x, y, d);
    } else {
        square(x, y, d)
    }
}

function mousePressed() {
    actRandomSeed = random(100000);
    console.log(actRandomSeed);
}

