let img;

let pixels;

let arr = new Array(50);
for(let i = 0; i < 50; i ++) {
    arr[i] = new Array(50);
}

function preload() {

    img = loadImage('./hello.png');
}

function setup() {
    createCanvas(img.width, img.height);
    image(img, 0, 0);

    img.loadPixels();



    // 50 * 50
    for(let height = 0; height < 400; height += 8) { // 50번 반복


        for(let width = 0; width < 400; width += 8) { // 50번 반복

            // 8 * 8 => 1
            pixels = 0;
            let i, j;
            for(j = 0; j < 8; j ++) { // 64번 반복
                for(i = 0; i < 8; i ++) {
                    pixels += get(i, j)[3];
                }
            }
            arr[width / 8][height / 8] = pixels / 64;



        }
    }
}

console.log(arr);



function draw() {

}