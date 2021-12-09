/* cssの設定を初期化する関数 */
function initializeCss() {

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

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let newCell = document.createElement('div');
            board.appendChild(newCell);
            newCell.className = 'cell';
            newCell.id = 'cell' + (i + 1) + (j + 1);
            newCell.style.width = cell_size + 'px';
            newCell.style.height = cell_size + 'px';
            newCell.style.left = (cell_size + 2) * j + 'px';
            newCell.style.top = (cell_size + 2) * i + 'px';
        }
    }

    /* 石の生成 */
    const stone_size = cell_size * 0.7;

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let newStone = document.createElement('div');
            let parent = document.getElementById('cell' + (i + 1) + (j + 1));
            parent.appendChild(newStone);
            newStone.className = 'stone';
            newStone.id = 'stone' + (i + 1) + (j + 1);
            newStone.style.width = stone_size + 'px';
            newStone.style.height = stone_size + 'px';
        }
    }

    /* メッセージの上のマージンを指定 */
    let margin = document.getElementById('margin');
    margin.style.height = cell_size + 'px';

    /* メッセージのサイズを指定 */
    let msg = document.getElementById('msg');
    msg.style.height = cell_size + 'px';
    msg.style.lineHeight = cell_size + 'px';
    msg.style.fontSize = cell_size * 0.4 + 'px';

    /* リセットボタンのサイズを指定 */
    let reset = document.getElementById('reset');
    reset.style.fontSize = cell_size * 0.3 + 'px';

    /* togetherjsボタンのサイズを指定 */
    let togetherjs = document.getElementById('togetherjs');
    togetherjs.style.fontSize = cell_size * 0.35 + 'px';

    /* ドロップダウンメニューのサイズを指定 */
    let playerSelect = document.getElementsByClassName('playerSelect');
    for (let i = 0; i < playerSelect.length; i++) {
        playerSelect.item(i).style.fontSize = cell_size * 0.3 + 'px';
    }

    /* スライダーのサイズを指定 */
    let speed = document.getElementById('speed');
    speed.style.width = cell_size * 3 + 'px';
    let slider = document.getElementById('slider');
    slider.style.fontSize = cell_size * 0.3 + 'px';

    /* 各種ボタンのマージンを指定 */
    let wrapper = document.getElementsByClassName('wrapper');
    for (let i = 0; i < wrapper.length; i++) {
        wrapper.item(i).style.margin = cell_size / 10 + 'px';
    }

    /* シミュレーションメッセージのサイズを指定 */
    let msg_size = cell_size * 0.33;
    let msgbox_size = msg_size * 1.6;

    let sim_msg1 = document.getElementById('sim_msg1');
    sim_msg1.style.height = msgbox_size + 'px';
    sim_msg1.style.lineHeight = msgbox_size + 'px';
    sim_msg1.style.fontSize = msg_size + 'px';

    let sim_msg2 = document.getElementById('sim_msg2');
    sim_msg2.style.height = msgbox_size + 'px';
    sim_msg2.style.lineHeight = msgbox_size + 'px';
    sim_msg2.style.fontSize = msg_size * 0.8 + 'px';

    /* ゲーム数入力欄のサイズを指定 */
    let textbox = document.getElementsByClassName('textbox');
    for (let i = 0; i < textbox.length; i++) {
        textbox.item(i).style.fontSize = msg_size * 0.8 + 'px';
    }

    /* シミュレーションのボタンのサイズを指定 */
    let sim_button = document.getElementsByClassName('sim_button');
    for (let i = 0; i < sim_button.length; i++) {
        sim_button.item(i).style.fontSize = msg_size * 0.7 + 'px';
    }

    /* シミュレーションのドロップダウンメニューのサイズを指定 */
    let sim_comSelect = document.getElementsByClassName('sim_comSelect');
    for (let i = 0; i < sim_comSelect.length; i++) {
        sim_comSelect.item(i).style.fontSize = msg_size * 0.8 + 'px';
    }
}