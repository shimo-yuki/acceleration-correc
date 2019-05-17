////////ß////////////加速度について//////////////////////////

var aX = 0, aY = 0, aZ = 0;

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


    ctx = document.getElementById("canvas").getContext("2d");
    displayData();
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


function get_data1() {
    return aX;
}
function get_data2() {
    return aY;
}
function get_data3() {
    return aZ;
}
