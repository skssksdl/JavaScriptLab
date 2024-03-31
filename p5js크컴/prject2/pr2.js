let x1 = [];
let y1 = [];
let x2 = [];
let y2 = [];
let cN = 1;
let siz = 2
let cent = 100

function setup() {
    createCanvas(cent, cent);
    gS(); // 시퀀스 생성
    pS(); // 시퀀스 출력
}

function gS() {
    for (let i = 1; i <= 300; i++) { // 10개의 시퀀스 생성

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

        line(lx1*siz+cent/2, ly1*siz+cent/2, lx2*siz+cent/2, ly2*siz+cent/2);

        console.log(y2[i]); // 시퀀스를 콘솔에 출력

    }
}