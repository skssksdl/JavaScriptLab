let x1 = 400;
let y1 = 400;
let sequence = [];

function setup() {
    createCanvas(800, 800);
    strokeWeight(4);
    stroke(0);

    for (let i = 1; i <= 50; i++) {
        let num = (-1) ** (i + 1) * i;
        sequence.push(num);
    }
}

function draw() {
    background(255);

    let startX = x1;
    let startY = y1;
    let secondX = x1;
    let secondY = y1;
    let endX = x1;
    let endY = y1;

    for (let r = 1; r <= 50; r += 4) {
        secondX += sequence[r];
        secondY += sequence[r];
        endX += sequence[r+1];
        endY += sequence[r+1]
        line(startX, startY, secondX, startY);
        line(secondX, startY, secondX, secondY);
        line(secondX, secondY, endX, secondY);
        line(endX, secondY, endX, endY);

        startX = endX;
        startY = endY;
    }
}