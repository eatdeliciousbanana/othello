/* 定数 */
const WHITE = 1;
const BLACK = -1;
const NONE = 0;
const BORDER = 2;


/* 座標を表すクラス */
class Position {
    constructor(y = 0, x = 0) {
        this.y = y;
        this.x = x;
    }

    SetY(y) {
        this.y = y;
    }

    SetX(x) {
        this.x = x;
    }

    GetY() {
        return this.y;
    }

    GetX() {
        return this.x;
    }
}


/* 1つのゲームを表すクラス
   プロパティ
   board: オセロ盤
   putcheck: 石を置ける場所
   turn: ターン
   turnNum: ターン数のカウント(1~61ターン)
   end: ゲームが終了しているかどうか
   メソッド
   GetBoard(): boardを返す
   GetPutcheck(): putcheckを返す
   GetTurn(): turnを返す
   GetTurnNum(): turnNumを返す
   GetEnd(): endを返す
   CheckBoard(): 置ける場所を探してputcheckに保存
   PutPosition(): 置ける場所を列挙して返す
   PutStone(y,x): boardに石を置いて挟んだ石を裏返す
   UpdateGame(): ゲームを次のターンに進める
   EndGame(): ゲームを終了する
   LoadGame(): 他のGameクラスを読み込む
   ResetGame(): ゲームをリセットする
   CountStone(color): 石の数を数える
   DebugBoard(): boardの状態を表示する（デバッグ用）
   */
class SubGame {
    constructor() {
        /* ボードの初期化 */
        let newboard = [];
        for (let i = 0; i < 10; i++) {
            newboard[i] = [];
            for (let j = 0; j < 10; j++) {
                newboard[i][j] = NONE;
            }
        }
        for (let i = 0; i < 10; i++) {
            newboard[0][i] = BORDER;
            newboard[i][0] = BORDER;
            newboard[i][9] = BORDER;
            newboard[9][i] = BORDER;
        }
        newboard[4][4] = WHITE;
        newboard[4][5] = BLACK;
        newboard[5][4] = BLACK;
        newboard[5][5] = WHITE;
        this.board = newboard;

        /* ターンを初期化 */
        this.turn = BLACK;

        /* ターン数のカウントを初期化 */
        this.turnNum = 1;

        /* ゲームが終了しているかどうかを初期化 */
        this.end = false;

        /* 置ける場所を示すボードを初期化 */
        let newputcheck = [];
        for (let i = 0; i < 10; i++) {
            newputcheck[i] = [];
            for (let j = 0; j < 10; j++) {
                newputcheck[i][j] = false;
            }
        }
        this.putcheck = newputcheck;
        this.CheckBoard();
    }


    /* boardを返すメソッド */
    GetBoard() {
        return this.board;
    }

    /* putcheckを返すメソッド */
    GetPutcheck() {
        return this.putcheck;
    }

    /* turnを返すメソッド */
    GetTurn() {
        return this.turn;
    }

    /* turnNumを返すメソッド */
    GetTurnNum() {
        return this.turnNum;
    }

    /* endを返すメソッド */
    GetEnd() {
        return this.end;
    }


    /* 置ける場所を探すメソッド */
    CheckBoard() {
        /* 置ける場所があるかどうかの判定 */
        let check = false;

        /* 全マスを調査 */
        for (let i = 1; i <= 8; i++) {
            for (let j = 1; j <= 8; j++) {

                /* デフォルトで置けない判定にしておく */
                this.putcheck[i][j] = false;

                /* 石がすでに置かれていれば置けない */
                if (this.board[i][j] !== NONE) {
                    continue;
                }

                /* 8方向走査 */
                let direction = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
                loop: for (let k = 0; k < 8; k++) {

                    /* 相手の石が続く間、自分の石が出てくるまでその方向をたどる */
                    let m = direction[k][0];
                    let n = direction[k][1];
                    while (this.board[i + m][j + n] === -this.turn) {
                        m += direction[k][0];
                        n += direction[k][1];
                        if (this.board[i + m][j + n] === this.turn) {
                            this.putcheck[i][j] = true;
                            check = true;
                            break loop;
                        }
                    }
                }
            }
        }

        /* 置ける場所があるかどうかを返す */
        return check;
    }


    /* 置ける場所を列挙して返すメソッド */
    PutPosition() {
        let ret = [];

        for (let i = 1; i <= 8; i++) {
            for (let j = 1; j <= 8; j++) {
                if (this.putcheck[i][j]) {
                    ret[ret.length] = new Position(i, j);
                }
            }
        }

        return ret;
    }


    /* 石を置いて、挟んだ石を裏返すメソッド */
    PutStone(pos) {

        /* 置けない場所には置かない */
        if (this.putcheck[pos.GetY()][pos.GetX()] === false) {
            return false;
        }

        /* 石を置く */
        this.board[pos.GetY()][pos.GetX()] = this.turn;

        /* 挟んだ石を裏返す 8方向走査 */
        let direction = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
        for (let i = 0; i < 8; i++) {

            /* 裏返す場所の候補を挙げる */
            let position = [];  //裏返す場所を格納する配列
            let flag = false;  //本当に裏返すかどうかを判定するフラグ
            let m = direction[i][0];
            let n = direction[i][1];
            while (this.board[pos.GetY() + m][pos.GetX() + n] === -this.turn) {
                position[position.length] = [pos.GetY() + m, pos.GetX() + n];
                m += direction[i][0];
                n += direction[i][1];
                if (this.board[pos.GetY() + m][pos.GetX() + n] === this.turn) {
                    flag = true;
                    break;
                }
            }

            /* 実際に裏返す */
            if (flag) {
                for (let j = 0; j < position.length; j++) {
                    this.board[position[j][0]][position[j][1]] = this.turn;
                }
            }
        }

        return true;
    }


    /* ゲームを次のターンに進めるメソッド */
    UpdateGame() {
        this.turn = -this.turn;
        this.turnNum++;

        if (!this.CheckBoard()) {
            this.turn = -this.turn;
            if (!this.CheckBoard()) {
                this.EndGame();
            }
        }
    }


    /* ゲームを終了するメソッド */
    EndGame() {
        this.end = true;
    }


    /* 他のGameクラスを読み込むメソッド */
    LoadGame(game) {
        let board = game.GetBoard();
        let putcheck = game.GetPutcheck();
        let turn = game.GetTurn();
        let turnNum = game.GetTurnNum();
        let end = game.GetEnd();

        for (let i = 1; i <= 8; i++) {
            for (let j = 1; j <= 8; j++) {
                this.board[i][j] = board[i][j];
                this.putcheck[i][j] = putcheck[i][j];
            }
        }
        this.turn = turn;
        this.turnNum = turnNum;
        this.end = end;
    }


    /* ゲームをリセットするメソッド */
    ResetGame() {
        /* ボードの初期化 */
        let newboard = [];
        for (let i = 0; i < 10; i++) {
            newboard[i] = [];
            for (let j = 0; j < 10; j++) {
                newboard[i][j] = NONE;
            }
        }
        for (let i = 0; i < 10; i++) {
            newboard[0][i] = BORDER;
            newboard[i][0] = BORDER;
            newboard[i][9] = BORDER;
            newboard[9][i] = BORDER;
        }
        newboard[4][4] = WHITE;
        newboard[4][5] = BLACK;
        newboard[5][4] = BLACK;
        newboard[5][5] = WHITE;
        this.board = newboard;

        /* ターンを初期化 */
        this.turn = BLACK;

        /* ターン数のカウントを初期化 */
        this.turnNum = 1;

        /* ゲームが終了しているかどうかを初期化 */
        this.end = false;

        /* 置ける場所を示すボードを初期化 */
        let newputcheck = [];
        for (let i = 0; i < 10; i++) {
            newputcheck[i] = [];
            for (let j = 0; j < 10; j++) {
                newputcheck[i][j] = false;
            }
        }
        this.putcheck = newputcheck;
        this.CheckBoard();
    }


    /* 石の数を数えるメソッド */
    CountStone(color) {
        let count = 0;
        for (let i = 1; i <= 8; i++) {
            for (let j = 1; j <= 8; j++) {
                if (this.board[i][j] === color) {
                    count++;
                }
            }
        }
        return count;
    }


    /* boardの状態を表示するメソッド（デバッグ用）*/
    DebugBoard() {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                console.log('board[' + i + '][' + j + ']: ' + this.board[i][j]);
            }
        }
    }
}





/* SubGameクラスに画面出力の機能を追加したクラス
   追加したメソッド
   OutputGame(): ゲームの状態を画面に反映
   LoadCookie(): Cookieを読み込む
   UpdateCookie(): Cookieを更新する
   変更したメソッド
   constructor()
   UpdateGame()
   EndGame()
   ResetGame()
   */
class Game extends SubGame {

    constructor() {
        super();
        this.LoadCookie();
        this.turnNum = this.CountStone(BLACK) + this.CountStone(WHITE) - 3;
        if (this.CheckBoard()) {
            this.OutputGame();
        } else {
            this.OutputGame();
            this.EndGame();
        }
    }


    /* ゲームの状態を表示するメソッド */
    OutputGame() {
        /* Cookieを更新 */
        this.UpdateCookie();

        /* メッセージを表示 */
        $('#msg').text(((this.turn === WHITE) ? '白' : '黒') + 'のターンです');

        /* オセロ盤を表示 */
        for (let i = 1; i <= 8; i++) {
            for (let j = 1; j <= 8; j++) {

                /* 石を表示 */
                let $stone = $('#stone' + i + j);
                switch (this.board[i][j]) {
                    case WHITE:
                        $stone.css({
                            'background-color': 'white',
                            'display': 'block'
                        });
                        break;
                    case BLACK:
                        $stone.css({
                            'background-color': 'black',
                            'display': 'block'
                        });
                        break;
                    case NONE:
                        $stone.css({
                            'background-color': 'null',
                            'display': 'none'
                        });
                        break;
                    default:
                        break;
                }

                /* マスを表示 */
                let $cell = $('#cell' + i + j);
                switch (this.putcheck[i][j]) {
                    case true:
                        $cell.css('background-color', 'rgb(70, 200, 30)');
                        break;
                    case false:
                        $cell.css('background-color', 'green');
                        break;
                    default:
                        break;
                }
            }
        }
    }


    /* ゲームを次のターンに進めるメソッド */
    UpdateGame() {
        this.turn = -this.turn;
        this.turnNum++;

        if (this.CheckBoard()) {
            this.OutputGame()
        } else {
            this.turn = -this.turn;
            if (this.CheckBoard()) {
                this.OutputGame();
            } else {
                this.OutputGame();
                this.EndGame();
            }
        }
    }


    /* ゲームを終了するメソッド */
    EndGame() {
        super.EndGame();
        let black = this.CountStone(BLACK);
        let white = this.CountStone(WHITE);

        let $msg = $('#msg');
        if (black > white) {
            $msg.text('黒' + black + '個, 白' + white + '個で黒の勝ちです！');
        } else if (black === white) {
            $msg.text('黒' + black + '個, 白' + white + '個で引き分けです！');
        } else {
            $msg.text('黒' + black + '個, 白' + white + '個で白の勝ちです！');
        }
    }


    /* ゲームをリセットするメソッド */
    ResetGame() {
        super.ResetGame();
        this.OutputGame();
    }


    /* Cookieを読み込むメソッド */
    LoadCookie() {
        let cookie = document.cookie;
        if (cookie.includes('board') === false) {
            return;
        }
        cookie = cookie.slice(6, cookie.length);
        for (let i = 1; i <= 8; i++) {
            for (let j = 1; j <= 8; j++) {
                this.board[i][j] = parseInt(cookie.charAt((i - 1) * 8 + j - 1)) - 1;  //盤の状態を復元
            }
        }
        this.turn = parseInt(cookie.charAt(cookie.length - 1)) - 1;  //ターンを復元
    }


    /* Cookieを更新するメソッド */
    UpdateCookie() {
        let cookie = 'board=';
        for (let i = 1; i <= 8; i++) {
            for (let j = 1; j <= 8; j++) {
                cookie += this.board[i][j] + 1;  //盤の状態を保存
            }
        }
        cookie += this.turn + 1;  //ターンを保存
        document.cookie = cookie;
    }
}