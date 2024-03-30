// 이 프로그램은 픽셀이 400*400이고 배경이 알파컬러, 그림이 알파컬러가 아닌 그런 그림만 사용 가능하다

let img;
let pixels; // 픽셀값을 저장할 변수
let arr = new Array(50); // 50x50 크기의 배열 선언

// 50x50 크기의 2차원 배열 초기화
for (let i = 0; i < 50; i++) {
    arr[i] = new Array(50);
}

function preload() {
    img = loadImage('./sia400.png'); // 이미지 로드
}

function setup() {
    createCanvas(1600, 900); // 캔버스 생성
    image(img, 0, 0); // 이미지 표시
    img.loadPixels(); // 이미지의 픽셀 정보 불러오기

    // 이미지를 8x8 픽셀 블록으로 나누어 각 블록의 평균 알파값을 구함
    for (let height = 0; height < 400; height += 8) { // 이미지 높이를 8 픽셀 단위로 반복
        for (let width = 0; width < 400; width += 8) { // 이미지 너비를 8 픽셀 단위로 반복
            pixels = 0; // 픽셀값 초기화
            for (let j = 0; j < 8; j++) { // 블록 내 행 반복
                for (let i = 0; i < 8; i++) { // 블록 내 열 반복
                    pixels += get(height + j, width + i)[3]; // 각 픽셀의 알파값을 합산
                }
            }
            arr[width / 8][height / 8] = pixels / 64; // 각 블록의 알파값의 평균을 계산하여 배열에 저장
        }
    }

    textSize(11);

    // 배열을 순회하며 해당 위치의 알파값에 따라 '@' 또는 '.'을 표시
    for (let j = 0; j < 50; j++) {
        for (let i = 0; i < 50; i++) {
            if (arr[j][i] > 0) {
                text("@", 400 + i * 16, j * 16, 12, 12); // '@'를 표시
            } else {
                text(".", 400 + i * 16, j * 16, 12, 12); // '.'을 표시
            }
        }
    }
}

function draw() {
    line(0, 0, 0, 400); // 왼쪽 선
    line(0, 400, 400, 400); // 아래쪽 선
    line(400, 400, 400, 0); // 오른쪽 선
    line(0, 400, 0, 0); // 위쪽 선
}
