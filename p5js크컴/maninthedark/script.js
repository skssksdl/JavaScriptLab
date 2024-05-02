// 이미지 배열 및 기타 변수 및 상수 선언
let img = []; // 이미지를 저장하는 배열
let totalLayers = 50; // 이미지 레이어의 총 개수
let points = []; // 마우스 이동 경로를 저장하는 배열
let easing = 0.03; // 이징(easing) 값으로, 애니메이션의 부드러운 이동을 제어

// 초기 좌표 값
let x = 0.0;
let y = 0.0;

// 마우스를 따라다니는지 여부
let mouseFollowing = true;

// 이미지 복제 관련 변수
let xA = [];
let yA = [];

// 화면 스케일
let s = 1;

// 이미지 로드
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
    frameRate(60);
    textSize(30);
    textAlign(CENTER);
}

// 주된 그리기 함수
function draw() {
    background("black");

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
        for (let i = 0; i < totalLayers; i++) {

                if (i == 0) {
                    // 마우스를 따라다님
                    x = x + ((mouseX - x) * easing);
                    y = y + ((mouseY - y) * easing);

                    xA[0] = x;
                    yA[0] = y;
                    //
                    // xA[0] = 0;
                    // yA[0] = 0;

                }
                else {
                    dy = yA[i - 1] - yA[i];
                    yA[i] = yA[i] + (dy * easing * 12);
                    dx = xA[i - 1] - xA[i];
                    xA[i] = xA[i] + (dx * easing * 12);
                }
            }

    // 이미지 그리기

        for (let i = totalLayers - 1; i > -1; i--) {
            push();
            translate(xA[i], yA[i]);
            image(img[i], -500, -500);

            drawingContext.shadowBlur =32;
            drawingContext.shadowColor =color(207, 7, 99);

            pop();
        }

    pop();

        console.log(mouseX,mouseY, xA, yA)

}



// 창 크기 변경 시 호출되는 함수
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
