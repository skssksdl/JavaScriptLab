let x1 = [];
let y1 = [];
let x2 = [];
let y2 = [];
let cN = 1;

function setup() {
    createCanvas(400, 400);
    gS(); // 시퀀스 생성
    pS(); // 시퀀스 출력
}

function gS() {
    for (let i = 1; i <= 30; i++) { // 10개의 시퀀스 생성

        x1.push(cN, cN, -cN, -cN); // 현재 숫자와 그 반대의 부호를 두 번씩 추가

        y1.push(cN, cN, -cN, -cN); // 현재 숫자와 그 반대의 부호를 두 번씩 추가

        x2.push(cN, cN, -cN, -cN); // 현재 숫자와 그 반대의 부호를 두 번씩 추가

        y2.push(cN, cN, -cN, -cN); // 현재 숫자와 그 반대의 부호를 두 번씩 추가
        cN++; // 다음 숫자로 이동
    }
}

function pS() {
    for (let i = 0; i < y1.length-2; i++) {

        let lx1 = x1[i+1];
        let ly1 = y1[i+2];
        let lx2 = x2[i];
        let ly2 = y2[i+1];

        line(lx1*5+200, ly1*5+200, lx2*5+200, ly2*5+200);

        console.log(y2[i]); // 시퀀스를 콘솔에 출력
    }
}