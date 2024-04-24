let img = [[]];
let totalLayers = 50;
let points = [];
let easing = 0.05;
let clicked = 0;

var x = 0.0;
var y = 0.0;
var mouseFollowing = true;

var xA = [[]];
var yA = [[]];

var rep = true;
var total = 4;

var elipseX = 0;
var elipseY = 0;

let xspeed = 5;
let yspeed = 5;
let r = 15;

var s = 1.0;

function createMetaTag() {
    let meta = createElement('meta');
    meta.attribute('name', 'viewport');
    meta.attribute('content', 'user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height');

    let head = select('head');
    meta.parent(head);
}

function preload() {
    for (var i = totalLayers - 1; i > -1  ; i--) {
        var index = i + 1;
        img[0][i] = loadImage("Man/" + index + ".png");
        xA[0].push(windowWidth/2);
        yA[0].push(windowHeight/2);
    }
}

function setup() {
    createMetaTag();
    createCanvas(windowWidth, windowHeight);

    frameRate(30);
    textSize(30);
    textAlign(CENTER);

    elipseX = windowWidth/2;
    elipseY = windowHeight / 2;

    var options = {
        preventDefault: true
    };

    var hammer = new Hammer(document.body, options);
    hammer.get('pinch').set({ enable: true });
    hammer.on("pinch", scaleRect);
    hammer.get('tap').set({ enable: true });
    hammer.on("tap", tapscreen);
}

function scaleRect(event) {
    s = event.scale;
    if (s > 1) s = 1;
}

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


function removeRep(t) {
    img.splice(t, 1);
    xA.splice(t, 1);
    yA.splice(t, 1);
}

function tapscreen(event) {
    if (rep) {
        replicate();
        rep = false;
    } else {
        clicked = 2;
    }

}

function touchEnded(event) {
    mouseFollowing = false;
}

function touchStarted(event) {
    mouseFollowing = true;
    /*
    if (!rep) {
        rep = true;
        clicked = 2;
    }
    */
    elipseX = event.touches[0].screenX;
    elipseY = event.touches[0].screenY;

}

function mouseClicked(event) {
    if (rep) {
        replicate();
        mouseFollowing = false;
    }
    if (clicked < 2) {
        clicked++;
    }

}

function draw() {
    background("#000000");

    push();
    scale(s);

    let point = {
        x: mouseX,
        y: mouseY
    };

    points.push(point);

    if (points.length > totalLayers) {
        points.splice(0, 1);
    }

    for (var z = img.length-1; z >-1 ; z--) {
        for (var i = 0; i < img[z].length; i++) {
            if (i == 0 && z > 0) {
                yA[z][0] = yA[z - 1][img[z].length-1];
                xA[z][0] = xA[z - 1][img[z].length-1];

            } else {
                if (z == 0 && i == 0) {

                    let targetX = mouseFollowing ? mouseX == 0 ? windowWidth/2 : mouseX/s : elipseX;
                    var dx = targetX - x;
                    x = x + (dx * easing);

                    let targetY = mouseFollowing ? mouseY == 0 ? windowHeight / 2 : mouseY/s : elipseY;
                    var dy = targetY - y;
                    y = y + (dy * easing);
                    yA[0][0] = y;
                    xA[0][0] = x;
                } else {
                    dy = yA[z][i - 1] - yA[z][i];
                    yA[z][i] = yA[z][i] + (dy * easing*12);
                    dx = xA[z][i - 1] - xA[z][i];
                    xA[z][i] = xA[z][i] + (dx * easing*12);
                }
            }
        }
    }



    for (var z = img.length - 1; z > -1; z--) {
        for (var i = img[z].length - 1; i > -1; i--) {
            push();
            translate(xA[z][i] - img[z][i].width / 2, yA[z][i] - img[z][i].height / 2);
            rotate(frameCount / 200)
            image(img[z][i], 0,0);
            pop();
        }
    }
    //ellipse(elipseX, elipseY, r * 2, r * 2);

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



    if (clicked == 2) {
        for (var z = 1; z < total + 1; z++) {
            removeRep(img.length-1);
        }
        clicked = 0;
        rep = true;
        mouseFollowing = true;
    }

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
