////////ß////////////加速度について//////////////////////////

var aX = 0, aY = 0, aZ = 0;
var gX = [], gY = [], gZ = [];

window.addEventListener("devicemotion", (dat) => {
    aX = dat.accelerationIncludingGravity.x;
    aY = dat.accelerationIncludingGravity.y;
    aZ = dat.accelerationIncludingGravity.z;
});

function displayData(){
    var txt = document.getElementById("txt");
    txt.innerHTML = "x: " + aX + "<br>"
                    + "y: " + aY + "<br>"
                    + "z: " + aZ;
}

var timer = window.setInterval(() =>{
    displayData();
}, 10);

var count = 0;
var id = setInterval(function(){
    count++;
    console.log(count);
    gX.push(aX);
    gY.push(aY);
    gZ.push(aZ);
    if(count % 5 == 0){　
      displayGraph();
      gX = [], gY = [], gZ = [];
    }}, 1000);


/////////////////////////////////////////////////////////
/////////////////////////表示系///////////////////////////
function displayGraph(){
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
        label: 'X方向',
        fill: false,
        data: gX,
        borderColor : "rgba(254,97,132,0.8)"
    },
    {
        label: 'Y方向',
        fill: false,
        data: gY,
        borderColor : "rgba(54,164,235,0.8)"
    },
    {
        label: 'Z方向',
        fill: false,
        data: gZ,
        borderColor : "rgba(255,255,0,0.8)"
    },
    ],
};
/////////////////////////////////////////////////////////