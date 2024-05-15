// https://github.com/nkymut/microbit-webble-p5js
// microbit firmware : https://makecode.microbit.org/61779-39134-92711-11083

let microBit;
let mbit = {
    a : false, b : false,
    x : 0, y : 0, z : 0,
    temp : 0,
    bearing : 0,
    updatePixel : false,
}

let ledMatrix = [
    ['0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0']
];


// setup microbit
microBit = new uBitWebBluetooth();
console.log("mbit", microBit);


function searchDevice() {
    microBit.searchDevice();
}


// events on microbit
microBit.onConnect(function() {

});


microBit.onDisconnect(function() {

});

microBit.onReceiveSerial(function(data) {
    console.log("Serial ", data);
});


microBit.onBleNotify(function() {
    mbit.a = microBit.getButtonA();
    mbit.b = microBit.getButtonB();
    mbit.x = microBit.getAccelerometer().x;
    mbit.y = microBit.getAccelerometer().y;
    mbit.z = microBit.getAccelerometer().z;
    mbit.temp = microBit.getTemperature();
    mbit.bearing = microBit.getBearing();
});


// functions for microbit
mbit.updatePixel = function(x, y, value) {
    if (value == 1){
        ledMatrix[x][y]=1;
    }else{
        ledMatrix[x][y]=0;
    }
    microBit.writeMatrixIcon(ledMatrix);
}


mbit.updateText = function(text) {
    microBit.writeMatrixText(text);
}
