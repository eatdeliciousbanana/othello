let plotLabels =  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40];
let plotData = {
    site1: [28, 42, 31, 56, 63, 79],
    site2: [17, 32, 35, 41, 47, 50],
};


let data = {
    labels: plotLabels,
    datasets: [
      {
        label: '黒',
        data: plotData.site1,
        // 背景色
        backgroundColor: '#7fcfff',
        // 線の色
        borderColor: '#7fcfff',
        // 塗りつぶし
        fill: false,
        // 折り目をカクカクにする
        lineTension: 0,
        // マーカー背景色
        pointBackgroundColor: '#7fcfff',
        // マーカーの Hover 時のサイズ
        pointHoverRadius: 3
      },
      {
        label: '白',
        data: plotData.site2,
        backgroundColor: '#ff978f',
        borderColor: '#ff978f',
        fill: false,
        lineTension: 0,
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
        // 軸線を表示しない
        gridLines: {
          display: true,
        },
        // 目盛り
        ticks: {
          fontColor: '#333',
          min: 0,
          maxTicksLimit: 10,
          maxRotation: 0,
          minRotation: 0,
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
          stepSize: 10,
        }
      }]
    }
};


// 折れ線グラフを描画
let ctx = document.getElementById('chart').getContext('2d');
let myLineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options,
});