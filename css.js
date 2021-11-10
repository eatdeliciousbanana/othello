/* cssの設定を初期化する関数 */
function initializeCss(){

    /* 表示領域のサイズを指定 */
    let back = document.getElementById('back');
    back.style.width = window.innerWidth + 'px';

    /* オセロ盤のサイズを指定 */
    let style = window.getComputedStyle(back);
    let board = document.getElementById('board');
    board.style.width = style.getPropertyValue('width');
    style = window.getComputedStyle(board);
    board.style.height = style.getPropertyValue('width');

    /* マスの生成 */
    const cell_size = parseInt(style.getPropertyValue('width')) / 8 - 2;

    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            let newCell = document.createElement('div');
            board.appendChild(newCell);
            newCell.className = 'cell';
            newCell.id = 'cell' + (i+1) + (j+1);
            newCell.style.width = cell_size + 'px';
            newCell.style.height = cell_size + 'px';
            newCell.style.left = (cell_size + 2) * j + 'px';
            newCell.style.top = (cell_size + 2) * i + 'px';
        }
    }

    /* 石の生成 */
    const stone_size = cell_size * 0.7;

    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            let newStone = document.createElement('div');
            let parent = document.getElementById('cell' + (i+1) + (j+1));
            parent.appendChild(newStone);
            newStone.className = 'stone';
            newStone.id = 'stone' + (i+1) + (j+1);
            newStone.style.width = stone_size + 'px';
            newStone.style.height = stone_size + 'px';
        }
    }

    /* メッセージのサイズを指定 */
    let msg = document.getElementById('msg');
    msg.style.width = style.getPropertyValue('width');
    msg.style.height = cell_size + 'px';
    msg.style.lineHeight = cell_size + 'px';
    msg.style.fontSize = cell_size*0.4 + 'px';

    /* リセットボタンのサイズを指定 */
    let reset = document.getElementById('reset');
    reset.style.fontSize = cell_size*0.3 + 'px';

    /* ドロップダウンメニューのサイズを指定 */
    let playerSelect = document.getElementsByClassName('playerSelect');
    for(let i=0;i<playerSelect.length;i++){
        playerSelect.item(i).style.fontSize = cell_size*0.3 + 'px';
    }

    /* スライダーのサイズを指定 */
    let speed = document.getElementById('speed');
    speed.style.width = cell_size*3 + 'px';
    let slider = document.getElementById('slider');
    slider.style.fontSize = cell_size*0.3 + 'px';

    /* 各種ボタンのマージンを指定 */
    let wrap = document.getElementsByClassName('wrap');
    for(let i=0;i<wrap.length;i++){
        wrap.item(i).style.margin = cell_size/10 + 'px';
    }
}