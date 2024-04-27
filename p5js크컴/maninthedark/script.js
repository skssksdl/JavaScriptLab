// 이미지 배열 및 기타 변수 및 상수 선언
let img = [[]]; // 이미지를 저장하는 배열
let totalLayers = 50; // 이미지 레이어의 총 개수
let points = []; // 마우스 이동 경로를 저장하는 배열
let easing = 0.03; // 이징(easing) 값으로, 애니메이션의 부드러운 이동을 제어
let clicked = 0; // 클릭 횟수



// 초기 좌표 값
var x = 0.0;
var y = 0.0;
// 마우스를 따라다니는지 여부
var mouseFollowing = true;

// 이미지 복제 관련 변수
var xA = [[]];
var yA = [[]];
var rep = true; // 이미지 복제 상태
var total = 4; // 총 복제 횟수

// 타원의 위치 및 이동 속도
var elipseX = 0;
var elipseY = 0;
let xspeed = 5;
let yspeed = 5;
let r = 15;

// 화면 스케일
var s = 1;

// 뷰포트 설정을 변경하는 함수
function createMetaTag() {
    let meta = createElement('meta');
    meta.attribute('name', 'viewport');
    meta.attribute('content', 'user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height');

    let head = select('head');
    meta.parent(head);
}

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
    createMetaTag(); // 뷰포트 설정 변경

    // 캔버스 생성
    createCanvas(windowWidth, windowHeight);

    // 프레임 속도 설정
    // frameRate(60);
    textSize(30);
    textAlign(CENTER);

    // 초기 타원 위치 설정
    elipseX = windowWidth / 2;
    elipseY = windowHeight / 2;

    // Hammer.js를 사용하여 제스처 이벤트 처리
    var options = {
        preventDefault: true
    };
    var hammer = new Hammer(document.body, options);
    hammer.get('pinch').set({ enable: true });
    hammer.on("pinch", scaleRect); // 핀치 제스처 이벤트
    hammer.get('tap').set({ enable: true });
    hammer.on("tap", tapscreen); // 탭 제스처 이벤트
}

// 핀치 제스처 이벤트 처리 함수
function scaleRect(event) {
    s = event.scale;
    if (s > 1) s = 1;
}

// 이미지 복제 함수
function replicate() {
    for (var z = 0; z < total; z++) {
        img.push([]);
        xA.push([]);
        yA.push([]);
        for (var i = 0; i < totalLayers; i++) {
            var index = i + 1;
            img[z + 1].push(img[0][i]);
            xA[z + 1].push(xA[z][img[z].length - 1]);
            yA[z + 1].push(yA[z][img[z].length - 1]);
        }

    }
    rep = false;
}

// 이미지 복제 제거 함수
function removeRep(t) {
    img.splice(t, 1);
    xA.splice(t, 1);
    yA.splice(t, 1);
}

// 탭 제스처 이벤트 처리 함수
function tapscreen(event) {
    if (rep) {
        replicate();
        rep = false;
    } else {
        clicked = 2;
    }
}

// 터치 종료 이벤트 처리 함수
function touchEnded(event) {
    mouseFollowing = false;
}

// 터치 시작 이벤트 처리 함수
function touchStarted(event) {
    mouseFollowing = true;
    elipseX = event.touches[0].screenX; // 타원의 x 좌표
    elipseY = event.touches[0].screenY; // 타원의 y 좌표
}

// 마우스 클릭 이벤트 처리 함수
function mouseClicked(event) {
    if (rep) {
        replicate();
        mouseFollowing = false;
    }
    if (clicked < 2) {
        clicked++;
    }
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
    for (var z = img.length - 1; z > -1; z--) {
        for (var i = 0; i < img[z].length; i++) {
            if (i == 0 && z > 0) {
                yA[z][0] = yA[z - 1][img[z].length - 1];
                xA[z][0] = xA[z - 1][img[z].length - 1];
            } else {
                if (z == 0 && i == 0) {
                    // 마우스를 따라다님
                    let targetX = mouseFollowing ? mouseX == 0 ? windowWidth : mouseX : elipseX;
                    var dx = targetX - x;
                    x = x + (dx * easing);
                    let targetY = mouseFollowing ? mouseY == 0 ? windowHeight : mouseY : elipseY;
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

    console.log(mouseX,mouseY);

    // 이미지 그리기
    for (var z = img.length - 1; z > -1; z--) {
        for (var i = img[z].length - 1; i > -1; i--) {
            push();
            translate(xA[z][i] - img[z][i].width/2, yA[z][i] - img[z][i].height/2-150);
            image(img[z][i], 0, 0);
            pop();
        }
    }

    // 타원 그리기
    // ellipse(elipseX, elipseY, r * 2, r * 2);

    // 타원의 이동
    var newW = width / s;
    var newH = height / s;
    elipseX += xspeed;
    elipseY += yspeed;
    if (elipseX > newW - r || elipseX < r) {
        xspeed = -xspeed;
    }
    if (elipseY > newH - r || elipseY < r) {
        yspeed = -yspeed;
    }

    pop();

    // 클릭이 2번 발생했을 때의 처리
    if (clicked == 2) {
        for (var z = 1; z < total + 1; z++) {
            removeRep(img.length - 1);
        }
        clicked = 0;
        rep = true;
        mouseFollowing = true;
    }
}

// 창 크기 변경 시 호출되는 함수
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
