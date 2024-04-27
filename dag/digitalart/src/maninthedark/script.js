import React, { useState, useEffect, useRef } from 'react';
import Hammer from 'hammerjs'; // Hammer.js 라이브러리 import
import P5 from './p5.js';

const MyCanvasComponent = () => {
    // 뷰포트 설정 변경 함수
    const createMetaTag = () => {
        const meta = document.createElement('meta');
        meta.setAttribute('name', 'viewport');
        meta.setAttribute('content', 'user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height');

        const head = document.querySelector('head');
        head.appendChild(meta);
    };

    // 이미지 배열과 기타 변수 및 상수 선언
    const totalLayers = 50; // 이미지 레이어의 총 개수
    const easing = 0.05; // 이징(easing) 값으로, 애니메이션의 부드러운 이동을 제어

    // 초기 좌표 값
    let x = 0.0;
    let y = 0.0;

    // 마우스를 따라다니는지 여부 및 상태 업데이트 함수
    const [mouseFollowing, setMouseFollowing] = useState(true);

    // 이미지 복제 관련 변수 및 상태 업데이트 함수
    const [xA, setXA] = useState([[]]);
    const [yA, setYA] = useState([[]]);
    const [rep, setRep] = useState(true);
    const [img, setImg] = useState([]);

    // 타원의 위치 및 이동 속도
    let elipseX = 0;
    let elipseY = 0;
    let xspeed = 5;
    let yspeed = 5;
    let r = 15;
    let total = 4;

    // 화면 스케일
    const [s, setS] = useState(1.0);

    // 캔버스 참조를 위한 useRef
    const canvasRef = useRef(null);

    // 이미지 로드
    useEffect(() => {
        createMetaTag(); // 뷰포트 설정 변경

        const loadImages = async () => {
            const loadedImages = [];
            for (let i = totalLayers - 1; i >= 0; i--) {
                const index = i + 1;
                const loadedImage = await loadImageAsync(`Man/${index}.png`);
                loadedImages.push(loadedImage);
                xA[0].push(window.innerWidth / 2); // 초기 x 좌표값 설정
                yA[0].push(window.innerHeight / 2); // 초기 y 좌표값 설정
            }
            setImg(loadedImages);
        };

        loadImages();
    }, []);

    // 이미지 로드 함수 (Promise 반환)
    const loadImageAsync = (url) => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = (error) => reject(error); // 이미지 로드 중에 오류가 발생하면 reject 호출
            image.src = url;
        });
    };

    // 캔버스 크기 변경 시 호출되는 함수
    const handleResize = () => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    };

    // Hammer.js를 사용하여 제스처 이벤트 처리
    useEffect(() => {
        const options = { preventDefault: true };
        const hammer = new Hammer(document.body, options);
        hammer.get('pinch').set({ enable: true });
        hammer.on("pinch", scaleRect); // 핀치 제스처 이벤트
        hammer.get('tap').set({ enable: true });
        hammer.on("tap", tapScreen); // 탭 제스처 이벤트

        // 컴포넌트 언마운트 시 이벤트 리스너 정리
        return () => {
            hammer.off("pinch", scaleRect);
            hammer.off("tap", tapScreen);
        };
    }, []);

    // 핀치 제스처 이벤트 처리 함수
    const scaleRect = (event) => {
        const scale = event.scale;
        setS(scale > 1 ? 1 : scale);
    };

    // 탭 제스처 이벤트 처리 함수
    const tapScreen = (event) => {
        if (rep) {
            replicate();
            setMouseFollowing(false);
        } else {
            setClicked(prevClicked => prevClicked + 1);
        }
    };

    // 이미지 복제 함수
    const replicate = () => {
        const newImg = [...img];
        const newX = [...xA];
        const newY = [...yA];
        for (let z = 0; z < total; z++) {
            newImg.push([...img]);
            newX.push([...xA[0]]);
            newY.push([...yA[0]]);
        }
        setImg(newImg);
        setXA(newX);
        setYA(newY);
        setRep(false);
    };

    // 이미지 복제 제거 함수
    const removeRep = (t) => {
        const newImg = [...img];
        const newX = [...xA];
        const newY = [...yA];
        newImg.splice(t, 1);
        newX.splice(t, 1);
        newY.splice(t, 1);
        setImg(newImg);
        setXA(newX);
        setYA(newY);
    };

    // 컴포넌트가 마운트될 때와 창 크기 변경 시 캔버스 크기 조정
    useEffect(() => {
        handleResize(); // 초기화
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 주된 그리기 함수
    const draw = () => {
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
    };

    return (
        <canvas ref={canvasRef} />
    );
};

export default MyCanvasComponent;
