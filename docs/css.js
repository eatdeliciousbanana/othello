/* サイズの設定を初期化する関数 */
function initSize() {

    /* 表示領域のサイズを設定 */
    $('#display').css('width', $(window).width() + 'px');

    /* オセロ盤のサイズを設定 */
    $('#board').css('height', $('#board').css('width'));

    /* マスの生成 */
    const cell_size = parseInt($('#board').css('width')) / 8 - 2;

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            $('#board').append('<div></div>');
            let $newCell = $('#board>div:last');
            $newCell.addClass('cell');
            $newCell.attr('id', 'cell' + (i + 1) + (j + 1));
            $newCell.css({
                'width': cell_size + 'px',
                'height': cell_size + 'px',
                'left': (cell_size + 2) * j + 'px',
                'top': (cell_size + 2) * i + 'px'
            });
        }
    }

    /* 石の生成 */
    const stone_size = cell_size * 0.7;

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            $('#cell' + (i + 1) + (j + 1)).append('<div></div>');
            let $newStone = $('#cell' + (i + 1) + (j + 1) + '>div');
            $newStone.addClass('stone');
            $newStone.attr('id', 'stone' + (i + 1) + (j + 1));
            $newStone.css({
                'width': stone_size + 'px',
                'height': stone_size + 'px'
            });
        }
    }

    /* 表示領域のはじめと最後のマージンを設定 */
    $('.display_margin').each(function (i, elem) {
        $(elem).css('height', cell_size + 'px');
    });

    /* メッセージのサイズを設定 */
    $('#msg').css({
        'height': cell_size + 'px',
        'line-height': cell_size + 'px',
        'font-size': cell_size * 0.4 + 'px'
    });

    /* リセットボタンのサイズを設定 */
    $('#reset').css('font-size', cell_size * 0.3 + 'px');

    /* オンラインマルチプレイボタンのサイズを設定 */
    $('#togetherjs').css('font-size', cell_size * 0.3 + 'px');

    /* ドロップダウンメニューのサイズを設定 */
    $('.playerSelect').each(function (i, elem) {
        $(elem).css('font-size', cell_size * 0.3 + 'px');
    });

    /* スライダーのサイズを設定 */
    $('#speed').css('width', cell_size * 3 + 'px');
    $('#slider').css('font-size', cell_size * 0.3 + 'px');

    /* 各種ボタンのマージンを設定 */
    $('.wrapper').each(function (i, elem) {
        $(elem).css('margin', cell_size / 10 + 'px');
    });

    /* シミュレーションメッセージのサイズを設定 */
    const msg_size = cell_size * 0.33;
    const msgbox_size = msg_size * 1.6;

    $('#sim_msg1').css({
        'height': msgbox_size + 'px',
        'line-height': msgbox_size + 'px',
        'font-size': msg_size + 'px'
    });

    $('#sim_msg2').css({
        'height': msgbox_size + 'px',
        'line-height': msgbox_size + 'px',
        'font-size': msg_size * 0.8 + 'px'
    });

    /* ゲーム数入力欄のサイズを設定 */
    $('.textbox').each(function (i, elem) {
        $(elem).css('font-size', msg_size * 0.8 + 'px');
    });

    /* シミュレーションのボタンのサイズを設定 */
    $('.sim_button').each(function (i, elem) {
        $(elem).css('font-size', msg_size * 0.7 + 'px');
    });

    /* シミュレーションのドロップダウンメニューのサイズを設定 */
    $('.sim_comSelect').each(function (i, elem) {
        $(elem).css('font-size', msg_size * 0.8 + 'px');
    });
}



/* ウィンドウリサイズ時にサイズの設定を更新する関数 */
function reSize() {

    /* 表示領域のサイズを設定 */
    $('#display').css('width', $(window).width() + 'px');

    /* オセロ盤のサイズを設定 */
    $('#board').css('height', $('#board').css('width'));

    /* マスのサイズを設定 */
    const cell_size = parseInt($('#board').css('width')) / 8 - 2;

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            $('#cell' + (i + 1) + (j + 1)).css({
                'width': cell_size + 'px',
                'height': cell_size + 'px',
                'left': (cell_size + 2) * j + 'px',
                'top': (cell_size + 2) * i + 'px'
            });
        }
    }

    /* 石のサイズを設定 */
    const stone_size = cell_size * 0.7;

    $('.stone').each(function (i, elem) {
        $(elem).css({
            'width': stone_size + 'px',
            'height': stone_size + 'px'
        });
    });

    /* 表示領域のはじめと最後のマージンを設定 */
    $('.display_margin').each(function (i, elem) {
        $(elem).css('height', cell_size + 'px');
    });

    /* メッセージのサイズを設定 */
    $('#msg').css({
        'height': cell_size + 'px',
        'line-height': cell_size + 'px',
        'font-size': cell_size * 0.4 + 'px'
    });

    /* リセットボタンのサイズを設定 */
    $('#reset').css('font-size', cell_size * 0.3 + 'px');

    /* オンラインマルチプレイボタンのサイズを設定 */
    $('#togetherjs').css('font-size', cell_size * 0.3 + 'px');

    /* ドロップダウンメニューのサイズを設定 */
    $('.playerSelect').each(function (i, elem) {
        $(elem).css('font-size', cell_size * 0.3 + 'px');
    });

    /* スライダーのサイズを設定 */
    $('#speed').css('width', cell_size * 3 + 'px');
    $('#slider').css('font-size', cell_size * 0.3 + 'px');

    /* 各種ボタンのマージンを設定 */
    $('.wrapper').each(function (i, elem) {
        $(elem).css('margin', cell_size / 10 + 'px');
    });

    /* シミュレーションメッセージのサイズを設定 */
    const msg_size = cell_size * 0.33;
    const msgbox_size = msg_size * 1.6;

    $('#sim_msg1').css({
        'height': msgbox_size + 'px',
        'line-height': msgbox_size + 'px',
        'font-size': msg_size + 'px'
    });

    $('#sim_msg2').css({
        'height': msgbox_size + 'px',
        'line-height': msgbox_size + 'px',
        'font-size': msg_size * 0.8 + 'px'
    });

    /* ゲーム数入力欄のサイズを設定 */
    $('.textbox').each(function (i, elem) {
        $(elem).css('font-size', msg_size * 0.8 + 'px');
    });

    /* シミュレーションのボタンのサイズを設定 */
    $('.sim_button').each(function (i, elem) {
        $(elem).css('font-size', msg_size * 0.7 + 'px');
    });

    /* シミュレーションのドロップダウンメニューのサイズを設定 */
    $('.sim_comSelect').each(function (i, elem) {
        $(elem).css('font-size', msg_size * 0.8 + 'px');
    });
}