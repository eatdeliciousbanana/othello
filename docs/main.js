/* 定数 */
const WHITE = 1;
const BLACK = -1;
const NONE = 0;
const BORDER = 2;


$(function () {
    /* cssの設定を初期化 */
    initializeCss();

    /* ウィンドウリサイズ */
    $(window).on('orientationchange resize', resizeCss);

    /* ゲームを作成 */
    const game = new Game();

    /* オンラインマルチプレイモードで, ゲームに参加したときに自動でページをリロードする */
    TogetherJS.on('ready', function () {
        $('.togetherjs-primary.togetherjs-dismiss').each(function (i, elem) {
            if ($(elem).text() === 'Yes, join session') {
                $(elem).on('click', function () {
                    window.setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                });
            }
        });
    });

    /* 黒プレイヤーの選択 */
    let blackPlayer = 'player';
    $('#blackSelect').on('change', function () {
        blackPlayer = $(this).val();
    });

    /* 白プレイヤーの選択 */
    let whitePlayer = 'player';
    $('#whiteSelect').on('change', function () {
        whitePlayer = $(this).val();
    });

    /* 対局スピードを設定 */
    let interval = 1000;
    let intervalId;
    autoplay();
    $('#speed').on('input', function () {
        window.clearInterval(intervalId);
        interval = 2000 - 20 * $(this).val();
        interval = (interval === 2000) ? 1000000 : interval;
        autoplay();
    });

    /* プレイヤーがコンピュータだったときに自動で石を置く関数 */
    function autoplay() {
        intervalId = window.setInterval(() => {
            if (game.GetTurn() === BLACK && blackPlayer !== 'player' || game.GetTurn() === WHITE && whitePlayer !== 'player') {
                controller();
            }
        }, interval);
    }

    /* オセロ盤がクリックされたときの処理 */
    $('.cell').each(function (i, elem) {
        $(elem).on('click', function () {
            let clickedPos = new Position();
            clickedPos.SetY(parseInt($(this).attr('id').charAt(4)));
            clickedPos.SetX(parseInt($(this).attr('id').charAt(5)));
            controller(clickedPos);
        });
    });

    /* ゲームを進める関数 */
    function controller(clickedPos) {

        if (game.GetEnd()) {
            return;
        }

        let playerSelect;
        if (game.GetTurn() === BLACK) {
            playerSelect = blackPlayer;
        } else {
            playerSelect = whitePlayer;
        }

        let pos;
        if (playerSelect === 'player') {
            pos = clickedPos;
        } else {
            let ret = toFunc(playerSelect);
            let func = ret[0];
            let depth = ret[1];
            let customCom = ret[2];
            pos = func(game, depth, customCom);
        }

        if (game.PutStone(pos)) {
            game.UpdateGame();
        }
    }

    /* リセットボタンが押されたときの処理 */
    $('#reset').on('click', function () {
        game.ResetGame();
    });

    /* シミュレーションの黒コンピュータの選択 */
    let sim_blackCom = 'random';
    $('#sim_blackSelect').on('change', function () {
        sim_blackCom = $(this).val();
        update_simmsg1();
    });

    /* シミュレーションの白コンピュータの選択 */
    let sim_whiteCom = 'random';
    $('#sim_whiteSelect').on('change', function () {
        sim_whiteCom = $(this).val();
        update_simmsg1();
    });

    /* シミュレーションメッセージ1の更新 */
    function update_simmsg1() {
        let color = [sim_blackCom, sim_whiteCom];
        for (let i = 0; i < 2; i++) {
            switch (color[i]) {
                case 'random':
                    color[i] = 'ランダム';
                    break;
                case 'oneTurnMax':
                    color[i] = '1ターン先最大石数';
                    break;
                case 'twoTurnMax':
                    color[i] = '2ターン先最大石数';
                    break;
                case 'threeTurnMax':
                    color[i] = '3ターン先最大石数';
                    break;
                case 'fourTurnMax':
                    color[i] = '4ターン先最大石数';
                    break;
                case 'fiveTurnMax':
                    color[i] = '5ターン先最大石数';
                    break;
                case 'oneTurnMin':
                    color[i] = '1ターン先最小石数';
                    break;
                case 'twoTurnMin':
                    color[i] = '2ターン先最小石数';
                    break;
                case 'threeTurnMin':
                    color[i] = '3ターン先最小石数';
                    break;
                case 'fourTurnMin':
                    color[i] = '4ターン先最小石数';
                    break;
                case 'fiveTurnMin':
                    color[i] = '5ターン先最小石数';
                    break;
                case 'oneTurnBestPos':
                    color[i] = '1ターン先最良位置';
                    break;
                case 'twoTurnBestPos':
                    color[i] = '2ターン先最良位置';
                    break;
                case 'threeTurnBestPos':
                    color[i] = '3ターン先最良位置';
                    break;
                case 'fourTurnBestPos':
                    color[i] = '4ターン先最良位置';
                    break;
                case 'fiveTurnBestPos':
                    color[i] = '5ターン先最良位置';
                    break;
                case 'customComA':
                    color[i] = 'カスタムA';
                    break;
                case 'customComB':
                    color[i] = 'カスタムB';
                    break;
                default:
                    break;
            }
        }

        $('#sim_msg1').text(color[0] + '(黒) vs ' + color[1] + '(白)');
    }

    /* シミュレーション開始ボタンが押されたときの処理 */
    $('#sim_start').on('click', function () {
        let game_num = parseInt($('#game_num').val());
        if (Number.isNaN(game_num) || game_num < 1 || game_num > 100000) {
            $('#sim_msg2').text('ゲーム数は 1 以上 100,000 以下の整数値を入力してください');
            return;
        }
        simulate(toFunc(sim_blackCom), toFunc(sim_whiteCom), game_num);
    });

    /* シミュレーションを初期化 */
    resetSimulation();

    /* シミュレーションリセットボタンが押されたときの処理 */
    $('#sim_reset').on('click', resetSimulation);

    /* シミュレーションをリセットする関数 */
    function resetSimulation() {
        $('#sim_blackSelect').val('random');
        $('#sim_whiteSelect').val('random');
        sim_blackCom = 'random';
        sim_whiteCom = 'random';
        update_simmsg1();
        simulate(toFunc(sim_blackCom), toFunc(sim_whiteCom), 0);
        $('#sim_msg2').text('ゲーム数を入力してシミュレーションを開始してください');
        $('#game_num').val('');
    }


    /* カスタムコンピュータのオプション */
    let customOptions = {
        customComA: {
            com1: random,
            com1_depth: 0,
            com2: random,
            com2_depth: 0,
            com3: random,
            com3_depth: 0,
            division1: 20,
            division2: 40,
        },
        customComB: {
            com1: random,
            com1_depth: 0,
            com2: random,
            com2_depth: 0,
            com3: random,
            com3_depth: 0,
            division1: 20,
            division2: 40,
        },
    };


    /* カスタムコンピュータAの表示切替 */
    $('#customComA_title').on('click', function () {
        $('#customComA_config').slideToggle();
    });


    /* カスタムコンピュータAの序盤コンピュータ */
    $('#customComA_select1').on('change', function () {
        let ret = toFunc($(this).val());
        customOptions.customComA.com1 = ret[0];
        customOptions.customComA.com1_depth = ret[1];
    });


    /* カスタムコンピュータAの中盤コンピュータ */
    $('#customComA_select2').on('change', function () {
        let ret = toFunc($(this).val());
        customOptions.customComA.com2 = ret[0];
        customOptions.customComA.com2_depth = ret[1];
    });


    /* カスタムコンピュータAの終盤コンピュータ */
    $('#customComA_select3').on('change', function () {
        let ret = toFunc($(this).val());
        customOptions.customComA.com3 = ret[0];
        customOptions.customComA.com3_depth = ret[1];
    });


    /* カスタムコンピュータAのスライダー */
    $('#customComA_slider').slider({
        range: true,
        min: 1,
        max: 60,
        step: 1,
        values: [20, 40],
        slide: function (event, ui) {
            let d1 = ui.values[0];
            let d2 = ui.values[1];
            customOptions.customComA.division1 = d1;
            customOptions.customComA.division2 = d2;
            $('#customComA_msg').text('序盤:1～' + d1 + '　中盤:' + (d1 + 1) + '～' + d2 + '　終盤:' + (d2 + 1) + '～60ターン');
        }
    });


    /* カスタムコンピュータBの表示切替 */
    $('#customComB_title').on('click', function () {
        $('#customComB_config').slideToggle();
    });


    /* カスタムコンピュータBの序盤コンピュータ */
    $('#customComB_select1').on('change', function () {
        let ret = toFunc($(this).val());
        customOptions.customComB.com1 = ret[0];
        customOptions.customComB.com1_depth = ret[1];
    });


    /* カスタムコンピュータBの中盤コンピュータ */
    $('#customComB_select2').on('change', function () {
        let ret = toFunc($(this).val());
        customOptions.customComB.com2 = ret[0];
        customOptions.customComB.com2_depth = ret[1];
    });


    /* カスタムコンピュータBの終盤コンピュータ */
    $('#customComB_select3').on('change', function () {
        let ret = toFunc($(this).val());
        customOptions.customComB.com3 = ret[0];
        customOptions.customComB.com3_depth = ret[1];
    });


    /* カスタムコンピュータBのスライダー */
    $('#customComB_slider').slider({
        range: true,
        min: 1,
        max: 60,
        step: 1,
        values: [20, 40],
        slide: function (event, ui) {
            let d1 = ui.values[0];
            let d2 = ui.values[1];
            customOptions.customComB.division1 = d1;
            customOptions.customComB.division2 = d2;
            $('#customComB_msg').text('序盤:1～' + d1 + '　中盤:' + (d1 + 1) + '～' + d2 + '　終盤:' + (d2 + 1) + '～60ターン');
        }
    });


    /* コンピュータ名をコンピュータ関数に変換 */
    function toFunc(comName) {
        let comFunc, depth, customCom;
        switch (comName) {
            case 'random':
                comFunc = random;
                break;
            case 'oneTurnMax':
                comFunc = nTurnMax;
                depth = 1;
                break;
            case 'twoTurnMax':
                comFunc = nTurnMax;
                depth = 2;
                break;
            case 'threeTurnMax':
                comFunc = nTurnMax;
                depth = 3;
                break;
            case 'fourTurnMax':
                comFunc = nTurnMax;
                depth = 4;
                break;
            case 'fiveTurnMax':
                comFunc = nTurnMax;
                depth = 5;
                break;
            case 'oneTurnMin':
                comFunc = nTurnMin;
                depth = 1;
                break;
            case 'twoTurnMin':
                comFunc = nTurnMin;
                depth = 2;
                break;
            case 'threeTurnMin':
                comFunc = nTurnMin;
                depth = 3;
                break;
            case 'fourTurnMin':
                comFunc = nTurnMin;
                depth = 4;
                break;
            case 'fiveTurnMin':
                comFunc = nTurnMin;
                depth = 5;
                break;
            case 'oneTurnBestPos':
                comFunc = nTurnBestPos;
                depth = 1;
                break;
            case 'twoTurnBestPos':
                comFunc = nTurnBestPos;
                depth = 2;
                break;
            case 'threeTurnBestPos':
                comFunc = nTurnBestPos;
                depth = 3;
                break;
            case 'fourTurnBestPos':
                comFunc = nTurnBestPos;
                depth = 4;
                break;
            case 'fiveTurnBestPos':
                comFunc = nTurnBestPos;
                depth = 5;
                break;
            case 'customComA':
                comFunc = custom;
                customCom = customOptions.customComA;
                break;
            case 'customComB':
                comFunc = custom;
                customCom = customOptions.customComB;
                break;
            default:
                break;
        }
        return [comFunc, depth, customCom];
    }
});