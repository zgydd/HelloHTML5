var canvas = null;
var context = null;
var innerData = null;
window.onload = function () {

    getInnerData();
    canvas = document.getElementById('canvas');
//    canvas.onclick = function(e){
//        console.log(e);
//    }
    canvas.width = innerData.length * 20 + 20;
    canvas.height = innerData[0].length * 20 + 20;
    context = canvas.getContext('2d');

    for (var i = 0; i < innerData.length; i++) {
        for (var j = 0; j < innerData[i].length; j++) {
//            if (innerData[i][j] < 480)
//                continue;
            var add = 2;
            var alp = innerData[i][j] / 1000;
            var gradient = context.createRadialGradient(i * 20 + (10 * add), j * 20 + (10 * add), (10 * add), i * 20 + (10 * add), j * 20 + (10 * add), (5 * add));
            gradient.addColorStop(1, 'rgba(255,0,0,' + alp + ')');
            gradient.addColorStop(0.8, 'rgba(255,0,0,' + alp/2 + ')');
            gradient.addColorStop(0.6, 'rgba(255,0,0,' + alp/4 + ')');
            gradient.addColorStop(0.4, 'rgba(255,0,0,' + alp/6 + ')');
            gradient.addColorStop(0.2, 'rgba(255,0,0,' + alp/8 + ')');
            gradient.addColorStop(0, 'rgba(255,0,0,0)');
            context.fillStyle = gradient;
            context.fillRect(i * 20, j * 20, 20 * add, 20 * add);
            //context.save();
        }
    }
};

var getInnerData = function () {
//    innerData = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//                , [0, 300, 600, 600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 800, 0]
//                , [0, 200, 700, 600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//                , [0, 200, 600, 400, 300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//                , [0, 100, 0, 0, 0, 0, 300, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//                , [0, 0, 0, 0, 0, 0, 200, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//                , [0, 0, 0, 0, 0, 0, 200, 100, 0, 0, 0, 0, 0, 0, 0, 0]
//                , [0, 0, 0, 0, 0, 0, 100, 50, 0, 0, 0, 0, 0, 0, 0, 0]
//                , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 100, 0, 0, 0]
//                , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 600, 650, 0, 0, 0]
//                , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 600, 700, 0, 0, 0]
//                , [0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 100, 500, 800, 0, 0]
//                , [0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 100, 200, 200, 0, 0, 0]
//                , [0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 100, 0, 0, 0, 0, 0]
//                , [0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 0]
//                , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    innerData = [];
    for (var j = 0; j < 80; j++) {
        var inLine = [];
        for (var i = 0; i < 32; i++) {
            var tmpRad = Math.round(Math.random() * 1000);
            if (tmpRad < 300)
                tmpRad = 0;
            if (tmpRad > 800)
                tmpRad = 0;
            inLine.push(tmpRad);
        }
        innerData.push(inLine);
    }
//    console.log(innerData);
};