/* 定数 */
const WHITE = 1;
const BLACK = -1;
const NONE = 0;
const BORDER = 2;


$(function () {
    /* cssの設定を初期化 */
    initializeCss();

    /* ゲームを作成 */
    const game = new Game();

    /* オンラインマルチプレイモードで, ゲームに参加したときに自動でページをリロードする */
    let reloadId = window.setInterval(() => {
        $('.togetherjs-primary.togetherjs-dismiss').each(function (i, elem) {
            if ($(elem).text() === 'Yes, join session') {
                $(elem).on('click', function () {
                    window.setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                });
                window.clearInterval(reloadId);
            }
        });
    }, 10);

    window.setTimeout(() => {
        window.clearInterval(reloadId);
    }, 3000);

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

    /* プレイヤーを呼び出す関数 */
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

        let pos = new Position();

        switch (playerSelect) {
            case 'player':
                pos = clickedPos;
                break;
            case 'random':
                pos = random(game);
                break;
            case 'oneTurnMax':
                pos = nTurnMax(game, 1);
                break;
            case 'twoTurnMax':
                pos = nTurnMax(game, 2);
                break;
            case 'threeTurnMax':
                pos = nTurnMax(game, 3);
                break;
            case 'fourTurnMax':
                pos = nTurnMax(game, 4);
                break;
            case 'fiveTurnMax':
                pos = nTurnMax(game, 5);
                break;
            case 'oneTurnMin':
                pos = nTurnMin(game, 1);
                break;
            case 'twoTurnMin':
                pos = nTurnMin(game, 2);
                break;
            case 'threeTurnMin':
                pos = nTurnMin(game, 3);
                break;
            case 'fourTurnMin':
                pos = nTurnMin(game, 4);
                break;
            case 'fiveTurnMin':
                pos = nTurnMin(game, 5);
                break;
            default:
                break;
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
                    color[i] = '1ターン先読み最大';
                    break;
                case 'twoTurnMax':
                    color[i] = '2ターン先読み最大';
                    break;
                case 'threeTurnMax':
                    color[i] = '3ターン先読み最大';
                    break;
                case 'fourTurnMax':
                    color[i] = '4ターン先読み最大';
                    break;
                case 'fiveTurnMax':
                    color[i] = '5ターン先読み最大';
                    break;
                case 'oneTurnMin':
                    color[i] = '1ターン先読み最小';
                    break;
                case 'twoTurnMin':
                    color[i] = '2ターン先読み最小';
                    break;
                case 'threeTurnMin':
                    color[i] = '3ターン先読み最小';
                    break;
                case 'fourTurnMin':
                    color[i] = '4ターン先読み最小';
                    break;
                case 'fiveTurnMin':
                    color[i] = '5ターン先読み最小';
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
        simulate(sim_blackCom, sim_whiteCom, game_num);
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
        simulate(sim_blackCom, sim_whiteCom, 0);
        $('#sim_msg2').text('ゲーム数を入力してシミュレーションを開始してください');
        $('#game_num').val('');
    }
});