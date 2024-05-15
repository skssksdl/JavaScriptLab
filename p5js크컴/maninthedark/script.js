let img = [];
let totalLayers = 50;
let points = [];
let easing = 0.03;

let x = 0.0;
let y = 0.0;

let xA = [];
let yA = [];

let s = 1;

let btSearch;
let mx = 0
let my = 0

function preload() {
    for (let i = totalLayers - 1; i > -1; i--) {
        let index = i + 1;
        img[i] = loadImage("Man/" + index + ".png");
        xA.push(windowWidth/2); // 초기 x 좌표값 설정
        yA.push(windowHeight/2); // 초기 y 좌표값 설정
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(30);
    textSize(30);
    textAlign(CENTER);

    btSearch = createButton("Search Microbit");
    btSearch.position(10, height+10);
    btSearch.mousePressed(searchDevice);
}

function draw() {
    background("white");
    scale(s);

    mx = mbit.x;
    my = mbit.y;

    console.log(mx, my)

    drawingContext.shadowBlur = 50;
    drawingContext.shadowColor = color("black");
    tint("white")

    let point = {mx, my};
    points.push(point);

    if (points.length > totalLayers) {
        points.splice(0, 1);
    }

    for (let i = 0; i < totalLayers; i++) {
        if (i == 0) {
            // 마우스를 따라다님
            x = x + ((mx - x) * easing);
            y = y + ((my - y) * easing);

            xA[0] = x;
            yA[0] = y;
        } else {
            dx = xA[i - 1] - xA[i];
            xA[i] = xA[i] + (dx * easing * 12);

            dy = yA[i - 1] - yA[i];
            yA[i] = yA[i] + (dy * easing * 12);
        }
    }

    for (let i = totalLayers - 1; i > -1; i--) {
        push();
        translate(xA[i], yA[i]);
        image(img[i], -500, -500);
        pop()

    }


}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
