import React, { useState, useEffect } from 'react';
import Hammer from 'hammerjs';
import p5 from 'p5';


const P5Sketch = () => {
    const [img, setImg] = useState([[]]);
    const [totalLayers] = useState(50);
    const [points, setPoints] = useState([]);
    const [easing] = useState(0.05);
    const [clicked, setClicked] = useState(0);
    const [x, setX] = useState(0.0);
    const [y, setY] = useState(0.0);
    const [mouseFollowing, setMouseFollowing] = useState(true);
    const [xA, setXA] = useState([[]]);
    const [yA, setYA] = useState([[]]);
    const [rep, setRep] = useState(true);
    const [totalRep] = useState(4);
    const [elipseX, setElipseX] = useState(0);
    const [elipseY, setElipseY] = useState(0);
    const [xspeed, setXSpeed] = useState(5);
    const [yspeed, setYSpeed] = useState(5);
    const [r] = useState(15);
    const [s, setS] = useState(1.0);
    const [canvasRef, setCanvasRef] = useState([[]]);
    const [removeRep, setRemoveRep] = useState([[]]);

    useEffect(() => {
        const preload = (p) => {
            for (let i = totalLayers - 1; i > -1; i--) {
                let index = i + 1;
                let imageArray = [...img];
                imageArray[0][i] = p.loadImage(`Man/${index}.png`);
                setImg(imageArray);

                let xArray = [...xA];
                xArray[0].push(p.windowWidth / 2);
                setXA(xArray);

                let yArray = [...yA];
                yArray[0].push(p.windowHeight / 2);
                setYA(yArray);
            }
        };

        const setup = (p) => {
            p.createCanvas(p.windowWidth, p.windowHeight);
            p.frameRate(30);
            p.textSize(30);
            p.textAlign(p.CENTER);

            setElipseX(p.windowWidth / 2);
            setElipseY(p.windowHeight / 2);

            const options = {
                preventDefault: true,
            };
            const hammer = new Hammer(document.body, options);
            hammer.get('pinch').set({ enable: true });
            hammer.on('pinch', scaleRect);
            hammer.get('tap').set({ enable: true });
            hammer.on('tap', tapscreen);
        };

        const scaleRect = (event) => {
            setS(event.scale > 1 ? 1 : event.scale);
        };

        const replicate = () => {
            for (let z = 0; z < totalRep; z++) {
                let newImg = [...img];
                newImg.push([]);
                setImg(newImg);

                let newX = [...xA];
                newX.push([]);
                setXA(newX);

                let newY = [...yA];
                newY.push([]);
                setYA(newY);

                for (let i = 0; i < totalLayers; i++) {
                    let index = i + 1;
                    newImg[z + 1].push(newImg[0][i]);
                    newX[z + 1].push(newX[z][newImg[z].length - 1]);
                    newY[z + 1].push(newY[z][newImg[z].length - 1]);
                }
            }
            setRep(false);
        };

        const tapscreen = (event) => {
            if (rep) {
                replicate();
                setRep(false);
            } else {
                setClicked(clicked + 1);
            }
        };

        const touchEnded = () => {
            setMouseFollowing(false);
        };

        const touchStarted = (event) => {
            setMouseFollowing(true);
            setElipseX(event.touches[0].screenX);
            setElipseY(event.touches[0].screenY);
        };

        const mouseClicked = (event) => {
            if (rep) {
                replicate();
                setMouseFollowing(false);
            }
            if (clicked < 2) {
                setClicked(clicked + 1);
            }
        };

        const draw = (p) => {
            p.background('#000000');
            p.push();
            p.scale(s);

            let point = {
                x: p.mouseX,
                y: p.mouseY,
            };
            setPoints([...points, point]);
            if (points.length > totalLayers) {
                setPoints(points.slice(1));
            }

            for (let z = img.length - 1; z > -1; z--) {
                for (let i = 0; i < img[z].length; i++) {
                    if (i === 0 && z > 0) {
                        let newY = [...yA];
                        newY[z][0] = newY[z - 1][img[z].length - 1];
                        setYA(newY);

                        let newX = [...xA];
                        newX[z][0] = newX[z - 1][img[z].length - 1];
                        setXA(newX);
                    } else {
                        let dx, dy;
                        if (z === 0 && i === 0) {
                            let targetX = mouseFollowing ? (p.mouseX === 0 ? p.windowWidth / 2 : p.mouseX / s) : elipseX;
                            dx = targetX - x;
                            setX(x + (dx * easing));
                            let targetY = mouseFollowing ? (p.mouseY === 0 ? p.windowHeight / 2 : p.mouseY / s) : elipseY;
                            dy = targetY - y;
                            setY(y + (dy * easing));
                            let newY = [...yA];
                            newY[0][0] = y;
                            setYA(newY);
                            let newX = [...xA];
                            newX[0][0] = x;
                            setXA(newX);
                        } else {
                            dy = yA[z][i - 1] - yA[z][i];
                            let newY = [...yA];
                            newY[z][i] = newY[z][i] + (dy * easing * 12);
                            setYA(newY);
                            dx = xA[z][i - 1] - xA[z][i];
                            let newX = [...xA];
                            newX[z][i] = newX[z][i] + (dx * easing * 12);
                            setXA(newX);
                        }
                    }
                }
            }

            for (let z = img.length - 1; z > -1; z--) {
                for (let i = img[z].length - 1; i > -1; i--) {
                    p.push();
                    p.translate(xA[z][i] - img[z][i].width / 2, yA[z][i] - img[z][i].height / 2);
                    p.rotate(p.frameCount / 200);
                    p.image(img[z][i], 0, 0);
                    p.pop();
                }
            }

            let newW = p.width / s;
            let newH = p.height / s;
            setElipseX(elipseX + xspeed);
            setElipseY(elipseY + yspeed);
            if (elipseX > newW - r || elipseX < r) {
                setXSpeed(-xspeed);
            }
            if (elipseY > newH - r || elipseY < r) {
                setYSpeed(-yspeed);
            }

            p.pop();

            if (clicked === 2) {
                for (let z = 1; z < totalRep + 1; z++) {
                    removeRep(img.length - 1);
                }
                setClicked(0);
                setRep(true);
                setMouseFollowing(true);
            }
        };

        const windowResized = (p) => {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };

        const sketch = (p) => {
            p.preload = preload;
            p.setup = () => setup(p);
            p.draw = () => draw(p);
            p.windowResized = () => windowResized(p);
            p.touchEnded = touchEnded;
            p.touchStarted = touchStarted;
            p.mouseClicked = mouseClicked;
        };

        let canvas = new p5(sketch);

        return () => canvas.remove();

    }, [img, totalRep, easing, s, clicked, x, y, mouseFollowing, xA, yA, elipseX, elipseY, xspeed, yspeed, r]);

    return <div ref={canvasRef}></div>;
};

export default P5Sketch;
