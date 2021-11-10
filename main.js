/* 定数 */
const WHITE = 1;
const BLACK = -1;
const NONE = 0;
const BORDER = 2;

/* cssの設定を初期化 */
initializeCss();

/* ゲームを作成 */
const game = new Game();

/* 黒プレイヤーの選択 */
let blackPlayer = 'player';
let blackSelect = document.getElementById('blackSelect');
blackSelect.addEventListener('change',()=>{
    blackPlayer = blackSelect.value;
});

/* 白プレイヤーの選択 */
let whitePlayer = 'player';
let whiteSelect = document.getElementById('whiteSelect');
whiteSelect.addEventListener('change',()=>{
    whitePlayer = whiteSelect.value;
});

/* 対局スピードを設定 */
let interval = 1000;
let intervalId;
autoplay();
let speed = document.getElementById('speed');
speed.addEventListener('input',()=>{
    window.clearInterval(intervalId);
    interval = 2000 - 20*speed.value;
    interval = (interval === 2000)? 1000000 : interval;
    autoplay();
});

/* プレイヤーがコンピュータだったときに自動で石を置く関数 */
function autoplay(){
    intervalId = window.setInterval(()=>{
        if(game.GetTurn() === BLACK && blackPlayer !== 'player' || game.GetTurn() === WHITE && whitePlayer !== 'player'){
            controller();
        }
    }, interval);
}

/* オセロ盤がクリックされたときの処理 */
let cells = document.getElementsByClassName('cell');
for(let i=0;i<64;i++){
    cells.item(i).addEventListener('click',()=>{
        let y = parseInt(cells.item(i).id.charAt(4));
        let x = parseInt(cells.item(i).id.charAt(5));
        controller(y,x);
    });
}

/* プレイヤーを呼び出す関数 */
function controller(y=0,x=0){

    let position = [0,0];

    let playerSelect;
    if(game.GetTurn() === BLACK){
        playerSelect = blackPlayer;
    }else{
        playerSelect = whitePlayer;
    }

    switch(playerSelect){
        case 'player':
            position[0] = y;
            position[1] = x;
            break;
        case 'random':
            position = random(game);
            break;
        case 'oneTurn':
            position = oneTurn(game);
            break;
        default:
            break;
    }

    if(game.PutStone(position[0], position[1])){
        game.UpdateGame();
    }
}

/* リセットボタンが押されたときの処理 */
let reset = document.getElementById('reset');
reset.addEventListener('click',()=>{
    game.ResetGame();
});