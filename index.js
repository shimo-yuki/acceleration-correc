////////ß////////////加速度について//////////////////////////
var aX = 0, aY = 0, aZ = 0;                     // 加速度の値を入れる変数を3個用意
var realX = [], realY = [], realZ = [], imaginaryX = [], imaginaryY = [], imaginaryZ = [];
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
    realZ.push(aZ)
    console.log('a')
}, 10); // 33msごとに（1秒間に約100回）

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
                label: 'X軸方向成分の加速度',
                fill: false,
                borderColor : "rgba(254,97,132,0.8)"
            }
        ],
    },
    options: {
        title: {                           //タイトル設定
            display: true,                 //表示設定
            fontSize: 18,                  //フォントサイズ
            text: 'X軸方向成分の加速度'                //ラベル
        },
        scales: {
            yAxes: [{
                ticks: {
                    min: -10,
                    max: 10
                },                  //y軸設定
                display: true,             //表示設定
                scaleLabel: {              //軸ラベル設定
                   display: true,          //表示設定
                   labelString: '加速度(m/s^2)',  //ラベル
                   fontSize: 18               //フォントサイズ
                },
            }],
            xAxes: [{
                display: true,                //表示設定
                    scaleLabel: {                 //軸ラベル設定
                       display: true,             //表示設定
                       labelString: '秒(s)',  //ラベル
                       fontSize: 18               //フォントサイズ
                    },   
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
                         //realX.push(get_data1());  
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
                label: 'Y軸方向成分の加速度',
                fill: false,
                borderColor : "rgba(54,164,235,0.8)"
            }
        ],
    },
    options: {
        title: {                           //タイトル設定
            display: true,                 //表示設定
            fontSize: 18,                  //フォントサイズ
            text: 'Y軸方向成分の加速度'                //ラベル
        },
        scales: {
            yAxes: [{    
                ticks: {                       
                    min: -10,                      
                    max: 10                 
                },                  //y軸設定
                display: true,             //表示設定
                scaleLabel: {              //軸ラベル設定
                   display: true,          //表示設定
                   labelString: '加速度(m/s^2)',  //ラベル
                   fontSize: 18               //フォントサイズ
                },
            }],
            xAxes: [{ 
                display: true,                //表示設定
                    scaleLabel: {                 //軸ラベル設定
                       display: true,             //表示設定
                       labelString: '秒(s)',  //ラベル
                       fontSize: 18               //フォントサイズ
                    },                        
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
                label: 'Z軸方向成分の加速度',
                fill: false,
                borderColor : "rgba(255,255,0,0.8)"
            },
        ],
    },
    options: {
        title: {                           //タイトル設定
            display: true,                 //表示設定
            fontSize: 18,                  //フォントサイズ
            text: 'Z軸方向成分の加速度'                //ラベル
        },
        scales: {
            yAxes: [{   
                ticks: {                       
                    min: -10,                      
                    max: 15                 
                },                   //y軸設定
                display: true,             //表示設定
                scaleLabel: {              //軸ラベル設定
                   display: true,          //表示設定
                   labelString: '加速度(m/s^2)',  //ラベル
                   fontSize: 18               //フォントサイズ
                },
            }],
            xAxes: [{ 
                display: true,                //表示設定
                    scaleLabel: {                 //軸ラベル設定
                       display: true,             //表示設定
                       labelString: '秒(s)',  //ラベル
                       fontSize: 18               //フォントサイズ
                    },                          
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
                        //realZ.push(get_data3());
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

}
var time = [], amp = []
document.getElementById("finishbtn").onclick = function(){
     for(var i = 0; i < 100; i++){
    //  realZ.push(Math.sin(2*Math.PI*(1/20)*i));
      time.push(i * 5 / 100)
      }
    // console.log(time)
    var txt = document.getElementById("console");
    txt.innerHTML = "real: " + realZ + "<br>"
                  + "imaginary: " + imaginaryZ ;



    ctrbar = document.getElementById("result1").getContext("2d");
    myBar = new Chart(ctrbar, {
        type: 'line', 
        fill: false,
        data: {
            labels: time,
            datasets: [
                {
                    fill: false,
                    borderColor : "rgba(0, 0, 0)",
                    label: "加速度",                            // 系列名
                    data: realZ
            }]
        },
        options: {
            title: {                           //タイトル設定
                display: true,                 //表示設定
                fontSize: 18,                  //フォントサイズ
                text: '時間軸に対する加速度'                //ラベル
            },
        scales: {
            yAxes: [{                      //y軸設定
                display: true,             //表示設定
                scaleLabel: {              //軸ラベル設定
                display: true,          //表示設定
                labelString: '加速度( m/s^2)',  //ラベル
                fontSize: 18               //フォントサイズ
                },
            }],
             xAxes: [{
                display: true,                //表示設定
                    scaleLabel: {                 //軸ラベル設定
                    display: true,             //表示設定
                    labelString: 'データ数',  //ラベル
                    fontSize: 18               //フォントサイズ
                    },
                }]
        }
    }
});
    imaginaryX = new Array(realZ.length);
    imaginaryX.fill(0);
    originalX = realZ.slice(0); 
    fftX.calc(1, realZ, imaginaryX)
    var phase = fftX.phase(realZ, imaginaryX);
    var frequencies = fftX.frequencies(realZ, imaginaryX, 1); //周波数
    var amplitude = fftX.amplitude(realZ, imaginaryX); //振幅
    var periods = fftX.periods(realZ, imaginaryX, 1);
    console.log(frequencies)
    console.log(amplitude)

    ctbar = document.getElementById("result").getContext("2d");
    myBar = new Chart(ctbar, {
        type: "line",    // ★必須　グラフの種類
        data: {
            labels:  amp,  // Ｘ軸のラベル
            datasets: [
                {
                    label: "FFT実行結果",
                    fill: false,                            // 系列名
                    data: amplitude                   // ★必須　系列Ａのデータ
                }
            ]
        },
        options: {
            title: {                           //タイトル設定
                display: true,                 //表示設定
                fontSize: 18,                  //フォントサイズ
                text: 'FFTの実行結果'                //ラベル
            },
        scales: {
            yAxes: [{                      //y軸設定
                display: true,             //表示設定
                scaleLabel: {              //軸ラベル設定
                display: true,          //表示設定
                labelString: '振幅',  //ラベル
                fontSize: 18               //フォントサイズ
                },
            }],
            xAxes: [{
                display: true,                //表示設定
                    scaleLabel: {                 //軸ラベル設定
                    display: true,             //表示設定
                    labelString: '周波数(Hz)',  //ラベル
                    fontSize: 18               //フォントサイズ
                    },
                }]
            }
        }
    });
};