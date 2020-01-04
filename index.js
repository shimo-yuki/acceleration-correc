var aX = 0, aY = 0, aZ = 0;                     // 加速度の値を入れる変数を3個用意
var date = [], realY = [], realZ = [], imaginaryX = [], imaginaryY = [], imaginaryZ = [];
var fftX = new FFT();
var fftY = new FFT();
var fftZ = new FFT();
    
window.addEventListener('devicemotion', (dat) => {
    aZ = dat.acceleration.z;    // z軸の重力加速度（Android と iOSでは正負が逆）
});
 
// 指定時間ごとに繰り返し実行される setInterval(実行する内容, 間隔[ms]) タイマーを設定
var timer = window.setInterval(() => {
    displayData();      // displayData 関数を実行
}, 100); // 33msごとに（1秒間に約100回）
 
// データを表示する displayData 関数
function displayData() {
    var txt = document.getElementById('txt');   // データを表示するdiv要素の取得
    txt.innerHTML = 'z: ' + aZ;                 // z軸の値
}

ctz = document.getElementById('canvasZ').getContext('2d');
myBar = new Chart(ctz, {
    type: 'line', 
    fill: false,
    data: {
        datasets: [
            {
                label: 'Z軸方向成分の加速度',
                fill: false,
                borderColor : 'rgba(255,255,0,0.8)'
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
                        date.push(Date.now());

                        // imaginaryZ = new Array(realZ.length);
                        // imaginaryZ.fill(0);
                        // originalZ = realZ.slice(0);   
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


function get_data3() {
    return aZ;
}


/////////////////////////////////////////////////////////
// function out(array){
//     $('#console').html( $('#console').html() +'<br/><br/>' +  JSON.stringify(array)  );

// }    // realZ.forEach(function(value){
    //     realX.push(value-9.80665)
    // });
        
//     imaginaryZ = new Array(realX.length);
//     imaginaryZ.fill(0);
//     originalZ = realX.slice(0);  
// console.log(realX)
//     fftZ.calc(1, realX, imaginaryZ)
//     var phase = fftX.phase(realX, imaginaryZ);
//     var frequencies = fftZ.frequencies(realX, imaginaryZ, 10); //周波数
//     var amplitude = fftZ.amplitude(realX, imaginaryZ); //振幅
//     var periods = fftZ.periods(realX, imaginaryZ, 1);
$(function($) {
    $(document).on("click", "#finishbtn", function () {
        console.log(realZ)
            
        ctbar = document.getElementById('result').getContext('2d');
        myBar = new Chart(ctbar, {
            type: 'line',    // ★必須　グラフの種類
            data: {
                labels: date,
                datasets: [{
                  label: "加速度",
                  data: realZ
                }]
            },
            options: {
                plugins: {
                    streaming: false,
                },
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'millisecond'
                        }
                    }]
                }
            }
        });
    })
})

//         fftX.calc( -1, realX, imaginaryZ);
    
//         console.timeEnd('fft');
//     var txt = document.getElementById('console');  
//     txt.innerHTML = 'real: ' + realX + '<br>'       
//                   + 'imaginary: ' + imaginaryZ ;
// }
