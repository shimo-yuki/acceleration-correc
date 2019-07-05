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
            yAxes: [                          
                {
                    ticks: {                       
                        min: -10,                      
                        max: 10                 
                    }
                }
            ],
            yAxes: [{                      //y軸設定
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
            yAxes: [                          
                {
                    ticks: {                       
                        min: -10,                      
                        max: 10                 
                    }
                }
            ],
            yAxes: [{                      //y軸設定
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
            yAxes: [                          
                {
                    ticks: {                       
                        min: -10,                      
                        max: 15                 
                    }
                }
            ],
            yAxes: [{                      //y軸設定
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


document.getElementById("finishbtn").onclick = function(){
    console.log('aa')


        //レスポンス
        var response = {};
        console.log('bb')
        //リクエスト
        let request = {para_1 : get_data1()};
                      
    
        //ajax
        $.ajax({
          type        : "POST",
          url         :'index.py',
          data        : JSON.stringify(request),  //object -> json
          async       : false,                    //true:非同期(デフォルト), false:同期
          dataType    : "json",
          success     : function(data) {
            //data = JSON.parse(data);  //error
            response = data;
          },
          error       : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("リクエスト時になんらかのエラーが発生しました\n"  + textStatus +":\n" + errorThrown);
          }
        });
    
        //表示
        console.log(response);
    };

