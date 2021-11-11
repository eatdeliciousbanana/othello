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
        let clickedPos = new Position();
        clickedPos.SetY(parseInt(cells.item(i).id.charAt(4)));
        clickedPos.SetX(parseInt(cells.item(i).id.charAt(5)));
        controller(clickedPos);
    });
}

/* プレイヤーを呼び出す関数 */
function controller(clickedPos){

    if(game.GetEnd()){
        return;
    }

    let playerSelect;
    if(game.GetTurn() === BLACK){
        playerSelect = blackPlayer;
    }else{
        playerSelect = whitePlayer;
    }

    let pos = new Position();

    switch(playerSelect){
        case 'player':
            pos = clickedPos;
            break;
        case 'random':
            pos = random(game);
            break;
        case 'oneTurn':
            pos = oneTurn(game);
            break;
        case 'twoTurn':
            pos = twoTurn(game);
            break;
         case 'threeTurn':
            pos = threeTurn(game);
            break;
        default:
            break;
    }

    if(game.PutStone(pos)){
        game.UpdateGame();
    }
}

/* リセットボタンが押されたときの処理 */
let reset = document.getElementById('reset');
reset.addEventListener('click',()=>{
    game.ResetGame();
});