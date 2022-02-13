// グラフの初期化
let ctx = document.getElementById('canvas').getContext('2d');
let myLineChart = new Chart(ctx, {});


// シミュレーションを行い結果をグラフに表示する関数
function simulate(sim_blackCom, sim_whiteCom, game_num) {

    // 石の数ごとのゲーム数
    let blackStone = [];
    let whiteStone = [];
    for (let i = 0; i <= 64; i++) {
        blackStone[i] = 0;
        whiteStone[i] = 0;
    }

    // 黒,白の勝ち数と引き分けの数
    let blackwin = 0;
    let whitewin = 0;
    let draw = 0;

    // 黒,白それぞれで使用する関数を決定
    let blackFunc = sim_blackCom[0];
    let blackDepth = sim_blackCom[1];
    let blackCustomCom = sim_blackCom[2];
    let whiteFunc = sim_whiteCom[0];
    let whiteDepth = sim_whiteCom[1];
    let whiteCustomCom = sim_whiteCom[2];


    // シミュレーション本体
    for (let i = 0; i < game_num; i++) {

        let subgame = new SubGame();

        while (!subgame.GetEnd()) {

            let pos;
            if (subgame.GetTurn() === BLACK) {
                pos = blackFunc(subgame, blackDepth, blackCustomCom);
            } else {
                pos = whiteFunc(subgame, whiteDepth, whiteCustomCom);
            }

            subgame.PutStone(pos);
            subgame.UpdateGame();
        }

        let blackCount = subgame.CountStone(BLACK);
        let whiteCount = subgame.CountStone(WHITE);

        if (blackCount > whiteCount) {
            blackwin++;
        } else if (blackCount < whiteCount) {
            whitewin++;
        } else {
            draw++;
        }

        blackStone[blackCount]++;
        whiteStone[whiteCount]++;
    }


    // グラフのラベルとデータ
    let plotLabels = [];
    for (let i = 0; i <= 64; i++) {
        plotLabels[i] = i;
    }
    let plotData = {
        black: blackStone,
        white: whiteStone,
    };


    let data = {
        labels: plotLabels,
        datasets: [
            {
                label: '黒',
                data: plotData.black,
                // 背景色
                backgroundColor: '#7fcfff',
                // 線の色
                borderColor: '#7fcfff',
                // 塗りつぶし
                fill: false,
                // 折り目をカクカクにする
                //lineTension: 0,
                // マーカー背景色
                pointBackgroundColor: '#7fcfff',
                // マーカーの Hover 時のサイズ
                pointHoverRadius: 3
            },
            {
                label: '白',
                data: plotData.white,
                backgroundColor: '#ff978f',
                borderColor: '#ff978f',
                fill: false,
                //lineTension: 0,
                pointBackgroundColor: '#ff978f',
                pointHoverRadius: 3
            },
        ],
    };


    // グラフオプション
    let options = {
        // 自動サイズ変更をする
        responsive: true,
        // タイトル
        title: {
            display: true,
            fontSize: 14,
            fontStyle: 'normal', // 太字にしない
            padding: 20,
            text: '黒と白の石の数の比較'
        },
        // 凡例
        legend: {
            // 右上に配置
            align: 'start',
            position: 'right',
            // 余白
            labels: {
                padding: 15
            }
        },
        // 軸
        scales: {
            // X 軸
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: '石の数',
                },
                // 軸線を表示する
                gridLines: {
                    display: true,
                },
                // 目盛り
                ticks: {
                    fontColor: '#333',
                    min: 0,
                    minRotation: 0,
                    maxRotation: 0,
                    maxTicksLimit: 10,
                },
            }],
            // Y 軸
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'ゲーム数',
                },
                gridLines: {
                    color: '#f3f3f3',
                    zeroLineColor: '#ddd'
                },
                ticks: {
                    fontColor: '#333',
                    min: 0,
                }
            }]
        }
    };


    // 折れ線グラフを描画
    myLineChart.destroy();  //それまで描画されていた内容を消去
    myLineChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options,
    });


    // 勝率を表示
    let blackwin_ratio = (blackwin / game_num).toFixed(4);
    let whitewin_ratio = (whitewin / game_num).toFixed(4);
    let draw_ratio = (draw / game_num).toFixed(4);
    $('#sim_msg2').text('黒の勝率:' + blackwin_ratio + '　白の勝率:' + whitewin_ratio + '　引き分けの比率:' + draw_ratio);
}