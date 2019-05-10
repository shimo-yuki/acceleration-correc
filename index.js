////////ß////////////加速度について//////////////////////////

var aX = 0, aY = 0, aZ = 0;
var gX = [], gY = [], gZ = [];
window.addEventListener("devicemotion", (dat) => {
    aX = dat.accelerationIncludingGravity.x;
    aY = dat.accelerationIncludingGravity.y;
    aZ = dat.accelerationIncludingGravity.z;
});

var timer = window.setInterval(() =>{
    displayData();
    gX.push(aX);
    gY.push(aY);
    gZ.push(aZ);
}, 10);

console.log(gX);
function displayData(){
    var txt = document.getElementById("txt");
    txt.innerHTML = "x: " + aX + "<br>"
                    + "y: " + aY + "<br>"
                    + "z: " + aZ;
}

/////////////////////////////////////////////////////////
window.onload = function() {
    ctx = document.getElementById("canvas").getContext("2d");
    window.myBar = new Chart(ctx, {
        type: 'line', 
        data: barChartData
    });
};
var xAxis = 5;
var labels = [];
for(var i = 0; i < xAxis; i++){
    labels.push(i);
}

var barChartData = {
    labels: labels,
    datasets: [
    {
        label: 'y1',
        fill: false,
        data: gX,
        borderColor : "rgba(254,97,132,0.8)"
    },
    {
        label: 'y2',
        fill: false,
        data: gY,
        borderColor : "rgba(54,164,235,0.8)"
    },
    {
        label: 'y3',
        fill: false,
        data: gZ,
        borderColor : "rgba(54,164,235,0.8)"
    },
    ],
};

// var ctx = document.getElementById("chart");
// var chartData  = {
//     labels: ['1', '2', '3', '4', '5'],
//     datasets: [
//         {
//             type: 'line',
//             label: 'sample-line',
//             data: ['0.155','0.118','0.121','0.068','0.083','0.060','0.067',
//             '0.121','0.121','0.150','0.118','0.097','0.078','0.127',
//             '0.155','0.140','0.101','0.140','0.041','0.093','0.189',
//             '0.146','0.134','0.127','0.116','0.111','0.125','0.116'
//             ],
//             borderColor : "rgba(254,97,132,0.8)",
//             backgroundColor : "rgba(254,97,132,0.5)",
//         },
//         {
//         type: 'line',
//         label: 'sample-line',
//         data: ['0.3','0.1','0.1','0.3','0.4','0.2','0.0',
//             '0.2','0.3','0.11','0.5','0.2','0.5','0.4',
//             '0.0','0.3','0.7','0.3','0.6','0.4','0.9',
//             '0.7','0.4','0.8','0.7','0.4','0.7','0.8'
//         ],
//         borderColor : "rgba(54,164,235,0.8)",
//         backgroundColor : "rgba(54,164,235,0.5)",
//         },
//     ],
// };

// var chart = new CanvasJS.Chart("chart",{
//     type: 'bar',
//     data: chartData

// });

// chart.render();