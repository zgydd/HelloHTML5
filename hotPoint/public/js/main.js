window.onload = function () {
    
    var innerData = getInnerData();
    var width = innerData.length * 10;
    var height = innerData[0].length * 10;

    $('.heatmap').width(width);
    $('.heatmap').height(height);

    // minimal heatmap instance configuration
    var heatmapInstance = heatmap.create({
        // only container is required, the rest will be defaults
        container: document.querySelector('.heatmap')
    });

    // now generate some random data
    var points = [];
    var max = 0;
    for (var i = 0; i < innerData.length; i++) {
        for (var j = 0; j < innerData[i].length; j++) {
            if (innerData[i][j] === 0)
                continue;
            max = Math.max(max, innerData[i][j]);
            var point = {
                x: i * 10,
                y: j * 10,
                value: innerData[i][j]
            };
            points.push(point);
        }
    }

    // heatmap data format
    var data = {
        max: max,
        data: points
    };
    // if you have a set of datapoints always use setData instead of addData
    // for data initialization
    heatmapInstance.setData(data);
};

var getInnerData = function () {
//    var innerData = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
    var innerData = [];
    for (var j = 0; j < 32; j++) {
        var inLine = [];
        for (var i = 0; i < 80; i++) {
            var tmpRad = Math.round(Math.random() * 1000);
            if (tmpRad < 600)
                tmpRad = 0;
            if (tmpRad > 700)
                tmpRad = 0;
            inLine.push(tmpRad);
        }
        innerData.push(inLine);
    }
    console.log(innerData);
    return innerData;
};
/*
 var canvas = null;
 var context = null;
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
 
 */