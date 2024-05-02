// 이미지 배열 및 기타 변수 및 상수 선언
let img = [[]]; // 이미지를 저장하는 배열
let totalLayers = 50; // 이미지 레이어의 총 개수
let points = []; // 마우스 이동 경로를 저장하는 배열
let easing = 0.03; // 이징(easing) 값으로, 애니메이션의 부드러운 이동을 제어

// 초기 좌표 값
var x = 0.0;
var y = 0.0;

// 마우스를 따라다니는지 여부
var mouseFollowing = true;

// 이미지 복제 관련 변수
var xA = [[]];
var yA = [[]];

// 화면 스케일
var s = 1;

// 이미지 로드
function preload() {
    for (var i = totalLayers - 1; i > -1; i--) {
        var index = i + 1;
        img[0][i] = loadImage("Man/" + index + ".png");
        xA[0].push(windowWidth/2); // 초기 x 좌표값 설정
        yA[0].push(windowHeight/2); // 초기 y 좌표값 설정
    }
}

function setup() {


    // 캔버스 생성
    createCanvas(windowWidth, windowHeight);

    // 프레임 속도 설정
    frameRate(60);
    textSize(30);
    textAlign(CENTER);


}

// 주된 그리기 함수
function draw() {
    background("#000000");

    push();
    scale(s); // 화면 스케일 설정

    // 마우스의 이동 경로를 저장
    let point = {
        x: mouseX,
        y: mouseY
    };
    points.push(point);
    if (points.length > totalLayers) {
        points.splice(0, 1);
    }

    // 이미지 그리기
    for (let z = img.length - 1; z > -1; z--) {
        for (let i = 0; i < img[z].length; i++) {

            console.log(img.length);
            // console.log(img[z].length, img.length);

            if (i == 1 && z > 0) {
                yA[z][0] = yA[z - 1][img[z].length - 1];
                xA[z][0] = xA[z - 1][img[z].length - 1];
            } else {
                if (z == 0 && i == 0) {
                    // 마우스를 따라다님
                    let targetX = mouseFollowing && mouseX == 0 ? windowWidth : mouseX

                    var dx = targetX - x;

                    x = x + (dx * easing);

                    let targetY = mouseFollowing && mouseY == 0 ? windowHeight : mouseY;

                    var dy = targetY - y;

                    y = y + (dy * easing);

                    yA[0][0] = y;
                    xA[0][0] = x;

                } else {

                    dy = yA[z][i - 1] - yA[z][i];

                    yA[z][i] = yA[z][i] + (dy * easing * 12);

                    dx = xA[z][i - 1] - xA[z][i];

                    xA[z][i] = xA[z][i] + (dx * easing * 12);
                }
            }
        }



    }

    // 이미지 그리기
    for (var z = img.length - 1; z > -1; z--) {
        for (var i = img[z].length - 1; i > -1; i--) {
            push();
            translate(xA[z][i] - img[z][i].width/2, yA[z][i] - img[z][i].height/2-150);
            image(img[z][i], 0, 0);
            pop();
        }
    }

    pop();


}

//
// function mouseClicked() {
//     for (i = 0; i < 49; i++) {
//         img[i]
//         tint(25.125)
//         sleep(0.1)
//
//         console.log(i)
//     }
//
// }
//
//
// function sleep(sec) {
//     let start = Date.now(), now = start;
//     while (now - start < sec * 1000) {
//         now = Date.now();
//     }
// }


// 창 크기 변경 시 호출되는 함수
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
