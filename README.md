# othello
オンライン対戦, コンピュータ対戦ができるオセロ

こちらからプレイできます
https://eatdeliciousbanana.github.io/othello/

<p align="center">
<img src="https://github.com/eatdeliciousbanana/othello/blob/main/screenshots/image0.jpg?raw=true" width="40%"> <img src="https://github.com/eatdeliciousbanana/othello/blob/main/screenshots/image1.jpg?raw=true" width="40%">
</p>

## 概要
ブラウザ上で動作するオセロゲームです。以下の5つのモードで遊ぶことができます。
- 人vs人のオセロ対戦
- 人vsコンピュータのオセロ対戦
- コンピュータvsコンピュータのオセロ対戦
- 遠くにいる人と一緒に遊べるオンラインマルチプレイモード
- コンピュータどうしの強さを比べられるシミュレーションモード

## 使用技術
- HTML
- CSS
- JavaScript
  - jQuery 3.6.0
  - jQuery UI 1.12.1
  - TogetherJS
  - Chart.js 2.9.3

## 遊び方
### ・人vs人モード
人同士でオセロをプレイすることができます。
プレイするには、黒（先攻）と白（後攻）のドロップダウンメニューの両方で「プレイヤー」を選択してください。
オセロ盤の光っているマスをクリックすると、その場所に石を置くことができます。
オセロ盤の下にあるリセットボタンを押すと、ゲームを最初からやり直すことができます。

<p align="center">
  <img src="https://github.com/eatdeliciousbanana/othello/blob/main/screenshots/gif0.gif?raw=true" width="45%">
</p>

### ・人vsコンピュータモード
コンピュータと対戦することができます。
プレイするには、黒（先攻）と白（後攻）のドロップダウンメニューのどちらか一方でコンピュータを選択してください。
選択できるコンピュータには以下のものがあります。

- **ランダム**・・・置ける場所の中からランダムに選んで石を置きます。
- **1～5ターン先最大石数**・・・1～5ターン先までを予想して、自分の石の数が最も多くなるような場所に置きます。
- **1～5ターン先最小石数**・・・1～5ターン先までを予想して、自分の石の数が最も少なくなるような場所に置きます。
- **1～5ターン先最良位置**・・・1～5ターン先までを予想して、自分がなるべく角を取りやすくなるような場所に置きます。
- **カスタムA,B**・・・3種類のコンピュータを組み合わせて、オリジナルの新たなコンピュータを作ることができます。

<p align="center">
  <img src="https://github.com/eatdeliciousbanana/othello/blob/main/screenshots/gif1.gif?raw=true" width="45%">
</p>

#### カスタムの作り方
カスタムでは、3種類のコンピュータを組み合わせてオリジナルの新たなコンピュータを作成できます。
カスタムの作成は、オセロ盤の下にあるカスタムA, カスタムBメニューから行うことができます。
まず、ゲームの序盤, 中盤, 終盤のそれぞれで使用するコンピュータを3つ選択してください。
その次に、スライダーを操作して序盤, 中盤, 終盤に割り当てるターン数を調整してください。

<p align="center">
  <img src="https://github.com/eatdeliciousbanana/othello/blob/main/screenshots/gif3.gif?raw=true" width="45%">
</p>

### ・コンピュータvsコンピュータモード
コンピュータ同士で対戦をさせることができます。
対戦させるには、黒（先攻）と白（後攻）のドロップダウンメニューの両方でいずれかのコンピュータを選択してください。
コンピュータの対戦中は、オセロ盤の下にある「対局スピード」のスライダーを操作することで、ゲームの進行する速さを変えることができます。

<p align="center">
  <img src="https://github.com/eatdeliciousbanana/othello/blob/main/screenshots/gif2.gif?raw=true" width="45%">
</p>

### ・オンラインマルチプレイモード
遠くにいる人とオンラインで対戦することができます。
下記の手順を自分側と相手側で行うことで、オンライン対戦を始めることができます。

#### 自分側
まず、オセロ盤の下にあるオンラインマルチプレイボタンを押してください。
すると、このゲームに紐づけられたURLが表示されるので、これをコピーしてメール等で相手に伝えてください。
そのあとは、相手がゲームに参加するのを待ってください。

<p align="center">
  <img src="https://github.com/eatdeliciousbanana/othello/blob/main/screenshots/gif4.gif?raw=true" width="45%">
</p>

#### 相手側
送られてきたURLにアクセスしてください。
すると、下のような画面が表示されるので、「Yes, join session」を押してゲームに参加してください。
相手プレイヤーのカーソルが表示されれば、ゲームを始めることができます。

<p align="center">
  <img src="https://github.com/eatdeliciousbanana/othello/blob/main/screenshots/gif5.gif?raw=true" width="45%">
</p>

#### オンライン対戦の仕方
オンライン対戦では、黒（先攻）と白（後攻）のドロップダウンメニューの両方で「プレイヤー」を選択してください。
先攻と後攻をあらかじめ決めておき、自分と相手で交互に石を置いていってください。

<p align="center">
  <img src="https://github.com/eatdeliciousbanana/othello/blob/main/screenshots/gif6.gif?raw=true" width="70%">
</p>

### ・シミュレーションモード
コンピュータどうしに好きな回数だけ対戦を行わせ、その結果からコンピュータの強さを比べることができます。
シミュレーションを行うには、まず、対戦させる2つのコンピュータを選択してください。
次に、コンピュータどうしで対戦させたい回数をゲーム数の欄に入力し、シミュレーション開始ボタンを押してください。
その後、結果のグラフが表示されます。
グラフは横軸が石の数、縦軸がゲーム数になっており、グラフが右側にずれているコンピュータのほうが強いということになります。
下の例では、「1ターン先最小石数」のコンピュータよりも「2ターン先最良位置」のコンピュータのほうが強いということが分かります。

<p align="center">
  <img src="https://github.com/eatdeliciousbanana/othello/blob/main/screenshots/gif7.gif?raw=true" width="50%">
</p>
