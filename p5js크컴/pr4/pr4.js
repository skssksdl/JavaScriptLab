let x, y;
x = 0;
y = 0;

let w = 20;
let p = 0.5;

function setup() {
    createCanvas(400, 400);
    background(0);

}

function draw() {
    // 랜덤으로 색을 설정
    let r = random(0);
    let g = random(0);
    let b = random(255);
    stroke(r, g, b);
    strokeWeight(10)

    if (random() > p) {
        line(x, y, x+w, y+w);
    } else {
        line(x+w, y, x, y+w);
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
