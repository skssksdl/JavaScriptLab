let w = 20;
let p = 0.5;
let grid = []; // 그려진 위치를 기록하기 위한 배열

function setup() {
    createCanvas(400, 400);
    background(0);
    stroke(255);
    strokeWeight(10);
    for (let i = 0; i < width / w; i++) {
        grid[i] = [];
        for (let j = 0; j < height / w; j++) {
            grid[i][j] = false; // 그려지지 않은 상태로 초기화
        }
    }
}

function draw() {
    if (mouseIsPressed) {
        let x = mouseX - mouseX % w;
        let y = mouseY - mouseY % w;

        // 해당 위치에 선이 그려지지 않은 경우에만 그리기
        if (!grid[x / w][y / w]) {
            if (random() > p) {
                line(x, y, x + w, y + w);
            } else {
                line(x + w, y, x, y + w);
            }
            grid[x / w][y / w] = true; // 그려진 위치를 기록
        }
    }
}
