////////ß////////////加速度について//////////////////////////

var aX = 0, aY = 0, aZ = 0;
var gX = [], gY = [], gZ = [];
// var gX1 = [], gX2 = [], gX3 = [], gX4 = [], gX5 = []
// var gY1 = [], gY2 = [], gY3 = [], gY4 = [], gY5 = [];
// var gZ1 = [], gZ2 = [], gZ3 = [], gZ4 = [], gZ5 = [];

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



/////////////////////////////////////////////////////////
/////////////////////////表示系///////////////////////////
//やること→動的にデータが後ろから前に変わるようにする
// .shiftで先頭を取る
// .pushで追加する
var xAxis = 5;
var labels = [];
for(var i = 0; i < xAxis; i++){
    labels.push(i);
}
var count = 0;
var id = setInterval(function(){
    count++;

    gX.push(aX);
    gY.push(aY);
    gZ.push(aZ);
    if(count % 5 == 0){　
    //   displayGraph();
      gX = [], gY = [], gZ = [];
    }}, 1000);

// function displayGraph(){
    var tx = document.getElementById("tx");
    tx.innerHTML = "x: " + gX + "<br>"
                    + "y: " + gY + "<br>"
                    + "z: " + gZ;
                    console.log(gX);

    ctx = document.getElementById("canvas").getContext("2d");
    window.myBar = new Chart(ctx, {
        type: 'line', 
        fill: false,
        // data: barChartData,
        data: {
            datasets: [
                {
                    label: 'X方向',
                    fill: false,
                    borderColor : "rgba(254,97,132,0.8)"
                },
                {
                    label: 'Y方向',
                    fill: false,
                    borderColor : "rgba(54,164,235,0.8)"
                },
                {
                    label: 'Z方向',
                    fill: false,
                    borderColor : "rgba(255,255,0,0.8)"
                },
            ],
        },
        options: {
            scales: {
                yAxes: [                          
                    {
                        ticks: {                       
                            min: -10,                      
                            max: 10                 
                        }
                    }
                ],
                xAxes: [                          
                    {
                        type: 'realtime'
                    }
                ]
            },
            plugins: {
                streaming: {            
                    duration: 20000,    
                    refresh: 1000,      
                    delay: 1000,        
                    frameRate: 30,      
                    pause: false,       
    
    
                    onRefresh: function(chart) {
                        chart.data.datasets[0].data.push({
                            //グラフにデータを追加
                            x: Date.now(),
                            y: get_data1()
                        }),
                        chart.data.datasets[1].data.push({
                            //グラフにデータを追加
                            x: Date.now(),
                            y: get_data2()
                        }),
                        chart.data.datasets[2].data.push({
                            //グラフにデータを追加
                            x: Date.now(),
                            y: get_data3()
                        });
                    }
                }
            }
        }
    });
// };
var count = 0;
function get_data1() {
    return aX;
}
function get_data2() {
    return aY;
}
function get_data3() {
    return aZ;
}
var barChartData = {
    labels: labels,
    datasets: [
    {
        label: 'X方向',
        fill: false,
        data: aX,
        borderColor : "rgba(254,97,132,0.8)"
    },
    {
        label: 'Y方向',
        fill: false,
        data: aY,
        borderColor : "rgba(54,164,235,0.8)"
    },
    {
        label: 'Z方向',
        fill: false,
        data: aZ,
        borderColor : "rgba(255,255,0,0.8)"
    },
    ],
};
/////////////////////////////////////////////////////////