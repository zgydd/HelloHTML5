'use strict';
window.onload = function () {

    var radius = 10;

    var dataResult = getInnerData();
    var width = dataResult.data.length * radius + radius;
    var height = dataResult.data[0].length * radius + radius;


    var canvas = null;
    var context = null;
    canvas = document.getElementById('canvas');

    canvas.width = width;
    canvas.height = height;
    context = canvas.getContext('2d');
    var denominator = dataResult.max - dataResult.min;

    var gradientDictionary = [{alpha: 52, colorR: 0, colorG: 0, colorB: 255}
        , {alpha: 104, colorR: 0, colorG: 255, colorB: 0}
        , {alpha: 153, colorR: 255, colorG: 255, colorB: 0}
        , {alpha: 205, colorR: 255, colorG: 0, colorB: 0}];

    for (var i = 0; i < dataResult.data.length; i++) {
        for (var j = 0; j < dataResult.data[i].length; j++) {
            if (dataResult.data[i][j] === 0)
                continue;
            var alp = (dataResult.data[i][j] - dataResult.min) / denominator;
            var gradient = context.createRadialGradient(i * radius + radius, j * radius + radius, 0, i * radius + radius, j * radius + radius, radius);
            gradient.addColorStop(0, 'rgba(0,0,0,' + alp + ')');
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            context.fillStyle = gradient;
            context.fillRect(i * radius, j * radius, radius * 2, radius * 2);
        }
    }

    var imgData = context.getImageData(0, 0, width, height);
    for (var i = 0; i < imgData.data.length; i += 4) {
        switch (true) {
            case (imgData.data[i + 3] <= 85):
                imgData.data[i] = 0;
                imgData.data[i + 1] = imgData.data[i + 3] * 3;
                imgData.data[i + 2] = 256 - imgData.data[i + 3] * 3;
                break;
            case (imgData.data[i + 3] <= 170):
                imgData.data[i] = imgData.data[i + 3] * 3;
                imgData.data[i + 1] = 256;
                imgData.data[i + 2] = 0;
                break;
            default:
                imgData.data[i] = 256;
                imgData.data[i + 1] = 256 - imgData.data[i + 3] * 3;
                imgData.data[i + 2] = 0;
                break;
        }
    }
    context.putImageData(imgData, 0, 0);



    canvas = document.getElementById('canvas2');

    canvas.width = width;
    canvas.height = height;
    context = canvas.getContext('2d');
    var denominator = dataResult.max - dataResult.min;

    var dataRange = [{scale: 1, critial: 700}, {scale: 2, critial: 500}, {scale: 3, critial: 300}, {scale: 4, critial: 100}];

    var alphaRangeCritial = 256 / (dataRange.length + 1);

    for (var i = 0; i < dataResult.data.length; i++) {
        for (var j = 0; j < dataResult.data[i].length; j++) {
            if (dataResult.data[i][j] === 0)
                continue;
            var alp = (dataResult.data[i][j] - dataResult.min) / denominator;

            var gradientIdx = 0;
            for (gradientIdx = dataRange.length + 1; gradientIdx > 0; gradientIdx--) {
                if (alp * 256 > gradientIdx * alphaRangeCritial)
                    break;
            }
            context.beginPath();
            context.arc(i * radius + radius, j * radius + radius, radius * (1 + gradientIdx / (dataRange.length + 1)), 0, Math.PI * 2);
            context.closePath();

            var gradient = context.createRadialGradient(i * radius + radius, j * radius + radius, radius / 8, i * radius + radius, j * radius + radius, radius * (1 + gradientIdx / (dataRange.length + 1)));
            //gradient.addColorStop(0, 'rgba(0,0,0,' + alp + ')');
            //console.log('---------------' + gradientIdx + '------------------');
            for (var k = 0; k < gradientIdx; k++) {
                //console.log((k / gradientIdx) + '::' + (alp / (k + 1)));
                gradient.addColorStop((k / gradientIdx), 'rgba(0,0,0,' + (alp / (k + 1)) + ')');
            }
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            context.fillStyle = gradient;
            context.fill();
        }
    }


//    var gradientDictionary = [{alpha: 52, colorR: 0, colorG: 0, colorB: 255}
//        , {alpha: 104, colorR: 0, colorG: 255, colorB: 0}
//        , {alpha: 153, colorR: 255, colorG: 255, colorB: 0}
//        , {alpha: 205, colorR: 255, colorG: 0, colorB: 0}];
//
//    for (var i = 0; i < dataResult.data.length; i++) {
//        for (var j = 0; j < dataResult.data[i].length; j++) {
//            if (dataResult.data[i][j] === 0)
//                continue;
//            var alp = (dataResult.data[i][j] - dataResult.min) / denominator;
//
//            var gradientIdx = 0;
//            for (gradientIdx = 0; gradientIdx < gradientDictionary.length; gradientIdx++) {
//                if (alp > gradientDictionary[gradientIdx].alpha)
//                    break;
//            }
//
//            if (gradientIdx <= 0)
//                break;
//            context.beginPath();
//            context.arc(i * radius + radius, j * radius + radius, radius, 0, Math.PI * 2);
//            context.closePath();
//
//            var gradient = context.createRadialGradient(i * radius + radius, j * radius + radius, 0, i * radius + radius, j * radius + radius, radius);
//            gradient.addColorStop(0, 'rgba(0,0,0,' + alp + ')');
//            gradient.addColorStop(1, 'rgba(0,0,0,0)');
//            context.fillStyle = gradient;
//            context.fill();
//        }
//    }
//
    var imgData = context.getImageData(0, 0, width, height);
    for (var i = 0; i < imgData.data.length; i += 4) {
        for (var j = gradientDictionary.length - 1; j >= 0; j--) {
            if (imgData.data[i + 3] > gradientDictionary[j].alpha) {
                imgData.data[i] = gradientDictionary[j].colorR;
                imgData.data[i + 1] = gradientDictionary[j].colorG;
                imgData.data[i + 2] = gradientDictionary[j].colorB;
                break;
            }
        }
    }
    context.putImageData(imgData, 0, 0);


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
    for (var i = 0; i < dataResult.data.length; i++) {
        for (var j = 0; j < dataResult.data[i].length; j++) {
            if (dataResult.data[i][j] === 0)
                continue;
            max = Math.max(max, dataResult.data[i][j]);
            var point = {
                x: i * radius,
                y: j * radius,
                value: dataResult.data[i][j]
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
    var result = {max: 800, min: 0, data: []};
    var innerData = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                , [0, 300, 600, 600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 800, 0]
                , [0, 200, 700, 600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                , [0, 200, 600, 400, 300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                , [0, 100, 0, 0, 0, 0, 300, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                , [0, 0, 0, 0, 0, 0, 200, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                , [0, 0, 0, 0, 0, 0, 200, 100, 0, 0, 0, 0, 0, 0, 0, 0]
                , [0, 0, 0, 0, 0, 0, 100, 50, 0, 0, 0, 0, 0, 0, 0, 0]
                , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 100, 0, 0, 0]
                , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 600, 650, 0, 0, 0]
                , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 600, 700, 0, 0, 0]
                , [0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 100, 500, 800, 0, 0]
                , [0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 100, 200, 200, 0, 0, 0]
                , [0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 100, 0, 0, 0, 0, 0]
                , [0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 0]
                , [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    result.data = innerData;
//    var result = {max: 0, min: 1000, data: []};
//    for (var j = 0; j < 32; j++) {
//        var inLine = [];
//        for (var i = 0; i < 80; i++) {
//            var tmpRad = Math.round(Math.random() * 1000);
//            if (result.max < tmpRad)
//                result.max = tmpRad;
//            if (result.min > tmpRad)
//                result.min = tmpRad;
//
//            if (tmpRad > 700 || tmpRad < 600)
//                tmpRad = 0;
//
//            inLine.push(tmpRad);
//        }
//        result.data.push(inLine);
//    }
    return result;
};