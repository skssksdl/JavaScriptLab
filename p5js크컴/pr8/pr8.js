let bx, by;
let vx, vy;
let bw;
let barX, barY;
let barW, barH;

function setup() {
    createCanvas(400, 300);
    bx = width / 2;
    by = height / 2;
    bw = 20;

    vx = random(-10, 10);
    vy = random(-10, 10);

    barW = 20;
    barH = 80;
    barX = width - barW - 10;
    barY = height / 2 - barH / 2;

    noStroke();
}

function draw() {
    background(0);

    rect(bx, by, bw, bw);

    bx += vx;
    by += vy;

    if (by < 0 || by > height - bw) {
        vy = -vy;
    }

    rect(barX, barY, barW, barH);

    if (keyIsDown(DOWN_ARROW) && barY + barH < height) {
        barY += 5;
    }
    if (keyIsDown(UP_ARROW) && barY > 0) {
        barY -= 5;
    }

    if (bx + bw > barX && by + bw > barY && by < barY + barH) {
        vx = -vx;
    }

    if (bx < 0 || bx > width - bw) {
        vx = -vx;
    }
}
