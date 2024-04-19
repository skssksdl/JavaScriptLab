let boxes = [];
let boxSize = 50;
let spacing = 70;
let actRandomSeed = 0;
function setup() {
    createCanvas(600, 600, WEBGL);

    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            for (let z = 0; z < 5; z++) {
                let boxPosition = createVector(x * spacing - 125, y * spacing - 125, z * spacing - 125);
                boxes.push(new Box(boxPosition));
            }
        }
    }
}

function draw() {
    randomSeed(actRandomSeed);
    background(255);
    rotateZ(frameCount * 0.01);
    rotateY(frameCount * 0.01);

    for (let box of boxes) {
        box.display();
    }
}

class Box {

    constructor(position) {

        this.position = position;
        this.vertices = [];
        for (let i = 0; i < 8; i++) {
            let shiftX = random(-mouseX, mouseX) / 20;
            let shiftY = random(-mouseY, mouseY) / 20;
            let shiftZ = random((-mouseX - mouseY)/2, (mouseX + mouseY)/2) / 20;
            let x = this.position.x + shiftX;
            let y = this.position.y + shiftY;
            let z = this.position.z + shiftZ;
            this.vertices.push(createVector(x, y, z));
        }



        this.strokeColor = color(255);
    }

    display() {
        let halfSize = boxSize / 2; // 상자 크기의 반
        let x = this.position.x;
        let y = this.position.y;
        let z = this.position.z;

        let t = 10



        let shiftX0 = mouseX / t * random(-1, 1);
        let shiftY0 = mouseY / t * random(-1, 1);
        let shiftZ0 = (mouseX + mouseY) / t * random(-1, 1);

        let shiftX1 = mouseX / t * random(-1, 1);
        let shiftY1 = mouseY / t * random(-1, 1);
        let shiftZ1 = (mouseX + mouseY) / t * random(-1, 1);

        let shiftX2 = mouseX / t * random(-1, 1);
        let shiftY2 = mouseY / t * random(-1, 1);
        let shiftZ2 = (mouseX + mouseY) / t * random(-1, 1);

        let shiftX3 = mouseX / t * random(-1, 1);
        let shiftY3 = mouseY / t * random(-1, 1);
        let shiftZ3 = (mouseX + mouseY) / t * random(-1, 1);

        let shiftX4 = mouseX / t * random(-1, 1);
        let shiftY4 = mouseY / t * random(-1, 1);
        let shiftZ4 = (mouseX + mouseY) / t * random(-1, 1);

        let shiftX5 = mouseX / t * random(-1, 1);
        let shiftY5 = mouseY / t * random(-1, 1);
        let shiftZ5 = (mouseX + mouseY) / t * random(-1, 1);

        let shiftX6 = mouseX / t * random(-1, 1);
        let shiftY6 = mouseY / t * random(-1, 1);
        let shiftZ6 = (mouseX + mouseY) / t * random(-1, 1);

        let shiftX7 = mouseX / t * random(-1, 1);
        let shiftY7 = mouseY / t * random(-1, 1);
        let shiftZ7 = (mouseX + mouseY) / t * random(-1, 1);



        // 상자의 꼭짓점 좌표
        let vertices = [
            createVector(x - halfSize, y - halfSize, z - halfSize),
            createVector(x + halfSize, y - halfSize, z - halfSize),
            createVector(x + halfSize, y + halfSize, z - halfSize),
            createVector(x - halfSize, y + halfSize, z - halfSize),
            createVector(x - halfSize, y - halfSize, z + halfSize),
            createVector(x + halfSize, y - halfSize, z + halfSize),
            createVector(x + halfSize, y + halfSize, z + halfSize),
            createVector(x - halfSize, y + halfSize, z + halfSize)
        ];

        colorMode(HSB, 360, 100, 100, 100);
        fill(192, 100, 64, 60);
        strokeWeight(0.4)
        stroke(this.strokeColor);
        // 앞면
        beginShape();
        vertex(vertices[0].x + shiftX0, vertices[0].y + shiftY0, vertices[0].z + shiftZ0);
        vertex(vertices[1].x + shiftX1, vertices[1].y + shiftY1, vertices[1].z + shiftZ1);
        vertex(vertices[2].x + shiftX2, vertices[2].y + shiftY2, vertices[2].z + shiftZ2);
        vertex(vertices[3].x + shiftX3, vertices[3].y + shiftY3, vertices[3].z + shiftZ3);
        endShape(CLOSE);

        // 뒷면
        beginShape();
        vertex(vertices[4].x + shiftX4, vertices[4].y + shiftY4, vertices[4].z + shiftZ4);
        vertex(vertices[5].x + shiftX5, vertices[5].y + shiftY5, vertices[5].z + shiftZ5);
        vertex(vertices[6].x + shiftX6, vertices[6].y + shiftY6, vertices[6].z + shiftZ6);
        vertex(vertices[7].x + shiftX7, vertices[7].y + shiftY7, vertices[7].z + shiftZ7);
        endShape(CLOSE);

        // 상단면
        beginShape();
        vertex(vertices[3].x + shiftX3, vertices[3].y + shiftY3, vertices[3].z + shiftZ3);
        vertex(vertices[2].x + shiftX2, vertices[2].y + shiftY2, vertices[2].z + shiftZ2);
        vertex(vertices[6].x + shiftX6, vertices[6].y + shiftY6, vertices[6].z + shiftZ6);
        vertex(vertices[7].x + shiftX7, vertices[7].y + shiftY7, vertices[7].z + shiftZ7);
        endShape(CLOSE);

        // 하단면
        beginShape();
        vertex(vertices[0].x + shiftX0, vertices[0].y + shiftY0, vertices[0].z + shiftZ0);
        vertex(vertices[1].x + shiftX1, vertices[1].y + shiftY1, vertices[1].z + shiftZ1);
        vertex(vertices[5].x + shiftX5, vertices[5].y + shiftY5, vertices[5].z + shiftZ5);
        vertex(vertices[4].x + shiftX4, vertices[4].y + shiftY4, vertices[4].z + shiftZ4);
        endShape(CLOSE);

        // 좌측면
        beginShape();
        vertex(vertices[0].x + shiftX0, vertices[0].y + shiftY0, vertices[0].z + shiftZ0);
        vertex(vertices[3].x + shiftX3, vertices[3].y + shiftY3, vertices[3].z + shiftZ3);
        vertex(vertices[7].x + shiftX7, vertices[7].y + shiftY7, vertices[7].z + shiftZ7);
        vertex(vertices[4].x + shiftX4, vertices[4].y + shiftY4, vertices[4].z + shiftZ4);
        endShape(CLOSE);

        // 우측면
        beginShape();
        vertex(vertices[1].x + shiftX1, vertices[1].y + shiftY1, vertices[1].z + shiftZ1);
        vertex(vertices[2].x + shiftX2, vertices[2].y + shiftY2, vertices[2].z + shiftZ2);
        vertex(vertices[6].x + shiftX6, vertices[6].y + shiftY6, vertices[6].z + shiftZ6);
        vertex(vertices[5].x + shiftX5, vertices[5].y + shiftY5, vertices[5].z + shiftZ5);
        endShape(CLOSE);

    }
}

function mousePressed() {
    actRandomSeed = random(100000);
}