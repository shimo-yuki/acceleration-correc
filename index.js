////////ß////////////加速度について//////////////////////////
var aX = 0, aY = 0, aZ = 0;                     // 加速度の値を入れる変数を3個用意
var real = [];
// var fft = require('fft-js').fft,
// signal = [1,0,1,0];

// var phasors = fft(signal);

// console.log(phasors);
// 加速度センサの値が変化したら実行される devicemotion イベント

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
window.myBar = new Chart(ctx, {
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
            xAxes: [                          
                {
                    type: 'realtime'
                }
            ]
        },
        plugins: {
            streaming: {            
                duration: 20000,    
                refresh: 200,      
                delay: 1000,         
                frameRate: 30,      
                pause: false,       


                onRefresh: function(chart) {
                    chart.data.datasets[0].data.push({
                        //グラフにデータを追加
                        x: Date.now(),
                        y: get_data1()
                    })
                }
            }
        }
    }
});
cty = document.getElementById("canvasY").getContext("2d");
window.myBar = new Chart(cty, {
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
            xAxes: [                          
                {
                    type: 'realtime'
                }
            ]
        },
        plugins: {
            streaming: {            
                duration: 20000,    
                refresh: 200,      
                delay: 1000,         
                frameRate: 30,     
                pause: false,       
                onRefresh: function(chart) {
                    chart.data.datasets[0].data.push({
                        //グラフにデータを追加
                        x: Date.now(),
                        y: get_data2()
                    })
                }
            }
        }
    }
});
ctz = document.getElementById("canvasZ").getContext("2d");
window.myBar = new Chart(ctz, {
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
            xAxes: [                          
                {
                    type: 'realtime'
                }
            ]
        },
        plugins: {
            streaming: {            
                duration: 20000,    
                refresh: 200,      
                delay: 1000,         
                frameRate: 30,      
                pause: false,       


                onRefresh: function(chart) {
                    chart.data.datasets[0].data.push({
                        //グラフにデータを追加
                        x: Date.now(),
                        y: get_data3()
                    })
                    // real.push(get_data3());
                    // var imaginary = new Array(real.length);
                    // imaginary.fill(0);
                    // var fft = new FFT();
                    // fft.calc(1, real, imaginary);
                    // console.log(fft);
                }
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