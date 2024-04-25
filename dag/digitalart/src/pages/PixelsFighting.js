import React, { useEffect, useRef } from 'react';

function PixelsFighting() {
    const canvasRef = useRef(null);
    const width = 500;
    const height = 500;
    const size = 125;
    const step = 500 / size;


    let Old = new Array (size);
    let New = new Array (size);
    //Anzahl der Nachbarn
    let Neigh = new Array (size);
    let Ratio1 = new Array (size);

    var Sum_1 = 0
    let color1 = "#dc5d5d"; // 검은색
    let color2 = "#5371c0"; // 흰색
    let help = 0

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let interval;

        // 초기화 함수
        const initialize = () => {


            for (let i = 0; i < Old . length; ++ i){
                Old [i] = new Array (size);
                New [i] = new Array (size);
                Neigh [i] = new Array (size);
                Ratio1 [i] = new Array (size);
            }
            for (let i = 0; i < size; ++ i){
                for (let j = 0; j < size; ++ j){
                    Ratio1 [i][j]=0;
                    Neigh[i][j]=8;
                    if (i===0 || i===size-1) {
                        Neigh[i][j]=5;
                        if(j===0 || j===size-1) {
                            Neigh[i][j]=3
                        }
                    }
                    if (j===0 || j===size-1) {
                        Neigh[i][j]=5;
                        if(i===0 || i===size-1) {
                            Neigh[i][j]=3
                        }
                    }
                    if (i<size/2){
                        Old [i][j] = 1;
                        Sum_1+=1
                    }
                    else {
                        Old [i][j] = 0;
                    }
                    New [i][j] = Old [i][j];
                }
            }
            Sum_1=Sum_1/(size*size);
        }


        // 비율 계산 함수
        const ratio = () => {
            for (let i = 0; i < size; ++ i){
                for (let j = 0; j < size; ++ j){
                    Ratio1[i][j]=0;
                    if(i>0){
                        if(j>0){ 		Ratio1[i][j]+=Old[i-1][j-1];}
                        Ratio1[i][j]+=Old[i-1][j];
                        if(j<size-1){	Ratio1[i][j]+=Old[i-1][j+1];}
                    }
                    if(j>0){ 		Ratio1[i][j]+=Old[i][j-1];}
                    if(j<size-1){	Ratio1[i][j]+=Old[i][j+1];}
                    if(i<size-1){
                        if(j>0){ 		Ratio1[i][j]+=Old[i+1][j-1];}
                        Ratio1[i][j]+=Old[i+1][j];
                        if(j<size-1){	Ratio1[i][j]+=Old[i+1][j+1];}
                    }
                    Ratio1[i][j]=Ratio1[i][j]/Neigh[i][j];
                }
            }
            console.log(Neigh[1][1]);
            console.log(Ratio1[1][1]);
            console.log(Sum_1);
        };

        // 그리기 함수
        const draw = () => {
            for (let i = 0; i < size; ++ i){
                for (let j = 0; j < size; ++ j){
                    ctx.fillStyle = color1;
                    if(Old[i][j]===1){ctx.fillStyle = color2;}
                    ctx.fillRect (i*step, j*step, step, step);
                }
            }
            // 여기에 그리기 로직 추가
        };

        // 계산 함수
        const calculate = () => {
            // 여기에 계산 로직 추가
            for (let i = 0; i < size; ++ i){
                for (let j = 0; j < size; ++ j){
                    help=Math.random();

                    if ((Ratio1[i][j])>help){
                        Old[i][j]=1;
                    } else{Old[i][j]=0;
                    }
                }
            }
            Sum_1=0;
            for (let i = 0; i < size; ++ i){
                for (let j = 0; j < size; ++ j){
                    if (Old[i][j]==1) Sum_1+=1;
                }
            }
            Sum_1=Sum_1/(size*size);
        };

        // 실행 함수
        const run = () => {
            ratio();
            draw();
            calculate();
        };

        // 게임 설정
        const setup = () => {
            initialize();
            interval = setInterval(run, 2);
        };

        // 컴포넌트 마운트 시 실행
        setup();

        // 언마운트 시 clearInterval 호출
        return () => clearInterval(interval);
    }, []);

    return (
        <center>
            <br />
            <div style={{ width: "100%" }}>
                <span style={{ fontFamily: "Arial Black, Gadget, sans-serif", fontSize: "1.5em", color: "black" }}>PIXELS FIGHTING</span>
            </div>
            <br /><br />
            <canvas ref={canvasRef} id="scrawl" width={width} height={height}></canvas>
            <br /><br /><br />
        </center>
    );
}

export default PixelsFighting;
