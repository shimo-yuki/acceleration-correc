////////ß////////////加速度について//////////////////////////
var aX = 0, aY = 0, aZ = 0;                     // 加速度の値を入れる変数を3個用意
var realX = [],realY = [], realZ = [], imaginaryX = [], imaginaryY = [], imaginaryZ = [];
var fftX = new FFT();
var fftY = new FFT();
var fftZ = new FFT();
    
    
window.addEventListener("devicemotion", (dat) => {
    var ua = [
		"iPod",
		"iPad",
		"iPhone",
		"Android"
    ]
	
	for (var i = 0; i < ua.length; i++) {
		if (navigator.userAgent.indexOf(ua[i]) > 0) {
            aX = -dat.accelerationIncludingGravity.x;    // x軸の重力加速度（Android と iOSでは正負が逆）
            aY = -dat.accelerationIncludingGravity.y;    // y軸の重力加速度（Android と iOSでは正負が逆）
            aZ = -dat.accelerationIncludingGravity.z;    // z軸の重力加速度（Android と iOSでは正負が逆）
            break;
		}
	}
    aX = dat.accelerationIncludingGravity.x;    // x軸の重力加速度（Android と iOSでは正負が逆）
    aY = dat.accelerationIncludingGravity.y;    // y軸の重力加速度（Android と iOSでは正負が逆）
    aZ = dat.accelerationIncludingGravity.z;    // z軸の重力加速度（Android と iOSでは正負が逆）
});
 
// 指定時間ごとに繰り返し実行される setInterval(実行する内容, 間隔[ms]) タイマーを設定
var timer = window.setInterval(() => {
    displayData();      // displayData 関数を実行
}, 100); // 33msごとに（1秒間に約100回）
 
// データを表示する displayData 関数
function displayData() {
    var txt = document.getElementById("txt");   // データを表示するdiv要素の取得
    txt.innerHTML = "x: " + aX + "<br>"         // x軸の値
                  + "y: " + aY + "<br>"         // y軸の値
                  + "z: " + aZ;                 // z軸の値
}

document.getElementById("result").innerHTML = getUserType()

function getUserType() {
	var ua = [
		"iPod",
		"iPad",
		"iPhone",
		"Android"
    ]

	
	for (var i = 0; i < ua.length; i++) {
		if (navigator.userAgent.indexOf(ua[i]) > 0) {
			return ua[i]
		}
	}
	return "Other"
}

ctx = document.getElementById("canvasX").getContext("2d");
myBar = new Chart(ctx, {
    type: 'line', 
    fill: false,
    data: {
        datasets: [
            {
                label: 'X方向',
                fill: false,
                borderColor : "rgba(254,97,132,0.8)"
            }
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
            xAxes: [{                          
                type: 'realtime',  
                realtime: {         
                    duration: 4000,      
                    refresh: 200,    
                    delay: 1000,   
                    pause: false, 

                    onRefresh: function(chart) {
                        chart.data.datasets[0].data.push({
                            //グラフにデータを追加
                            x: Date.now(),
                            y: get_data1()
                        })
                        realX.push(get_data1());
                        imaginaryX = new Array(realX.length);
                        imaginaryX.fill(0);
                        originalX = realX.slice(0);   
                    }
                }
            }]
        },
        plugins: {
            streaming: {      
                frameRate: 30
            }
        }
    }
});
cty = document.getElementById("canvasY").getContext("2d");
myBar = new Chart(cty, {
    type: 'line', 
    fill: false,
    data: {
        datasets: [
            {
                label: 'Y方向',
                fill: false,
                borderColor : "rgba(54,164,235,0.8)"
            }
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
            xAxes: [{                          
                type: 'realtime',  
                realtime: {         
                    duration: 4000,      
                    refresh: 200,    
                    delay: 1000,   
                    pause: false, 

                    onRefresh: function(chart) {
                        chart.data.datasets[0].data.push({
                            //グラフにデータを追加
                            x: Date.now(),
                            y: get_data2()
                        })
                        realY.push(get_data2());
                        imaginaryY = new Array(realY.length);
                        imaginaryY.fill(0);
                        originalY = realY.slice(0);   
                    }
                }
            }]
        },
        plugins: {
            streaming: {      
                frameRate: 30
            }
        }
    }
});
ctz = document.getElementById("canvasZ").getContext("2d");
myBar = new Chart(ctz, {
    type: 'line', 
    fill: false,
    data: {
        datasets: [
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
                        max: 15                 
                    }
                }
            ],
            xAxes: [{                          
                type: 'realtime',  
                realtime: {         
                    duration: 4000,      
                    refresh: 200,    
                    delay: 1000, 
                    pause: false, 

                    onRefresh: function(chart) {
                        chart.data.datasets[0].data.push({
                            //グラフにデータを追加
                            x: Date.now(),
                            y: get_data3()
                        })
                        realZ.push(get_data3());
                        imaginaryZ = new Array(realZ.length);
                        imaginaryZ.fill(0);
                        originalZ = realZ.slice(0);   
                    }
                }
            }]
        },
        plugins: {
            streaming: {      
                frameRate: 30
            }
        }
    }
});


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
/////////////////////////////////////////////////////////
function out(array){
    $("#console").html( $("#console").html() +"<br/><br/>" +  JSON.stringify(array)  );
    console.log( JSON.stringify(array));
}
document.getElementById("finishbtn").onclick = function(){
        

        var data1=[{
            name:'real array',
            y:realX
        },
        {   
            name:'imaginary array',
            y:imaginaryX
        }];

        var data2=[{
                name:'real array',
                y:realY
            },
            {   
                name:'imaginary array',
                y:imaginaryY
            }];

        var data3=[{
            name:'real array',
            y:realZ
        },
        {   
            name:'imaginary array',
            y:imaginaryZ
        }];

        Plotly.plot('stage1', data1, {
                                    title: 'FFT',
                                    xaxis: {title: 'index'}
                                 });
        Plotly.plot('stage2', data2, {
                                    title: 'FFT',
                                    xaxis: {title: 'index'}
                                 });
        Plotly.plot('stage3', data3, {
                                    title: 'FFT',
                                    xaxis: {title: 'index'}
                                 });

        fft.calc( -1, real, imaginary);
    
        console.timeEnd('fft');
    var txt = document.getElementById("console");  
    txt.innerHTML = "real: " + real + "<br>"       
                  + "imaginary: " + imaginary ;
}

