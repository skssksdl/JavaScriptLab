let spring = 0.05; // 탄성 계수
let gravity = 0.5; // 중력
let friction = -0.5; // 마찰력
let ball; // 공 객체
let bar; // 막대 객체

function setup() {
    createCanvas(640, 360); // 캔버스 생성
    ball = new Ball(width / 2, height / 2, 15); // 공 객체 생성
    bar = new Bar(); // 막대 객체 생성
    noStroke(); // 선 없음
    fill(255); // 흰색으로 채우기
}

function draw() {
    background(0); // 배경을 검정으로 설정
    ball.collide(); // 충돌 확인
    ball.move(); // 공 이동
    bar.followMouse(); // 막대 따라가기
    ball.display(); // 공 표시
    bar.display(); // 막대 표시
}

class Ball {
    constructor(xin, yin, din) {
        this.x = xin;
        this.y = yin;
        this.diameter = din;
        this.vx = random(-2, 2); // 랜덤한 초기 x 속도 설정 (-2에서 2 사이)
        this.vy = random(-2, 2); // 랜덤한 초기 y 속도 설정 (-2에서 2 사이)
    }

    // 나머지 코드는 그대로 유지됩니다.



    collide() {
        // 막대와의 충돌 감지
        if (
            this.y + this.diameter / 2 >= bar.y - bar.height / 2 &&
            this.x + this.diameter / 2 >= bar.x - bar.width / 2 &&
            this.x - this.diameter / 2 <= bar.x + bar.width / 2
        ) {
            let dy = this.y - (bar.y - bar.height / 2) - this.diameter / 2; // y 거리 계산
            let minDist = this.diameter / 2; // 최소 거리 계산
            if (dy < minDist) {
                let ay = (minDist - dy) * spring; // y 가속도 계산
                this.vy = -this.vy * random(0.8, 1.4); // 튕겨나가는 힘 설정
                this.vx = -this.vx * random(-1, 1) + random(-2, 2);

                this.y = bar.y - bar.height / 2 - this.diameter / 2; // 공 위치 설정

                console.log(this.vy, this.vx)
            }
        }
    }

    move() {
        this.vy += gravity; // 중력 적용
        this.x += this.vx; // x 위치 조정
        this.y += this.vy; // y 위치 조정

        if (this.x + this.diameter / 2 > width) {
            this.x = width - this.diameter / 2; // 오른쪽 벽에 부딪힘
            this.vx *= friction; // 마찰력 적용
        } else if (this.x - this.diameter / 2 < 0) {
            this.x = this.diameter / 2; // 왼쪽 벽에 부딪힘
            this.vx *= friction; // 마찰력 적용
        }

        if (this.y + this.diameter / 2 > height) {
            this.y = height - this.diameter / 2; // 아래쪽 벽에 부딪힘
            this.vy *= friction; // 마찰력 적용
        } else if (this.y - this.diameter / 2 < 0) {
            this.y = this.diameter / 2; // 위쪽 벽에 부딪힘
            this.vy *= friction; // 마찰력 적용
        }
    }

    display() {
        ellipse(this.x, this.y, this.diameter, this.diameter); // 공 표시
    }
}

class Bar {
    constructor() {
        this.width = 100; // 막대의 너비
        this.height = 10; // 막대의 높이
        this.x = mouseX; // 막대의 x 좌표를 초기 마우스 x 좌표로 설정
        this.y = height - 20; // 막대의 y 좌표를 캔버스 하단에 설정
    }

    followMouse() {
        this.x = mouseX;
        this.y = mouseY;// 막대의 x 좌표를 마우스 x 좌표로 업데이트
    }

    display() {
        rectMode(CENTER);
        rect(this.x, this.y, this.width, this.height); // 막대 표시
    }
}

