// m以上n未満のランダムな整数を返す関数
function getRandom(m, n) {
    return Math.floor(Math.random() * (n - m)) + m;
}


// ランダム
function random(game) {
    let pos = game.PutPosition();
    let num = getRandom(0, pos.length);
    return pos[num];
}


// nターン先最大石数
function nTurnMax(game, n) {
    let subgame = new SubGame();
    let pos = game.PutPosition();
    let maxCount = 0;
    let maxPosition = [];

    for (let i = 0; i < pos.length; i++) {
        subgame.LoadGame(game);
        subgame.PutStone(pos[i]);
        nTurnMax_kernel(subgame, n);

        let count = subgame.CountStone(game.GetTurn());
        if (count > maxCount) {
            maxCount = count;
            maxPosition.length = 0;
            maxPosition[0] = pos[i];
        } else if (count === maxCount) {
            maxPosition[maxPosition.length] = pos[i];
        }
    }

    let num = getRandom(0, maxPosition.length);
    return maxPosition[num];
}


// nターン先最大石数のカーネル
function nTurnMax_kernel(subgame, n) {
    if (n === 1) {
        return;
    }
    subgame.UpdateGame();
    if (!subgame.GetEnd()) {
        subgame.PutStone(nTurnMax(subgame, n - 1));
        nTurnMax_kernel(subgame, n - 1);
    }
}


// nターン先最小石数
function nTurnMin(game, n) {
    let subgame = new SubGame();
    let pos = game.PutPosition();
    let minCount = 65;
    let minPosition = [];

    for (let i = 0; i < pos.length; i++) {
        subgame.LoadGame(game);
        subgame.PutStone(pos[i]);
        nTurnMin_kernel(subgame, n);

        let count = subgame.CountStone(game.GetTurn());
        if (count < minCount) {
            minCount = count;
            minPosition.length = 0;
            minPosition[0] = pos[i];
        } else if (count === minCount) {
            minPosition[minPosition.length] = pos[i];
        }
    }

    let num = getRandom(0, minPosition.length);
    return minPosition[num];
}


// nターン先最小石数のカーネル
function nTurnMin_kernel(subgame, n) {
    if (n === 1) {
        return;
    }
    subgame.UpdateGame();
    if (!subgame.GetEnd()) {
        subgame.PutStone(nTurnMin(subgame, n - 1));
        nTurnMin_kernel(subgame, n - 1);
    }
}


// 重み付け
const weight = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 30, -12, 0, -1, -1, 0, -12, 30, 0],
    [0, -12, -15, -3, -3, -3, -3, -15, -12, 0],
    [0, 0, -3, 0, -1, -1, 0, -3, 0, 0],
    [0, -1, -3, -1, -1, -1, -1, -3, -1, 0],
    [0, -1, -3, -1, -1, -1, -1, -3, -1, 0],
    [0, 0, -3, 0, -1, -1, 0, -3, 0, 0],
    [0, -12, -15, -3, -3, -3, -3, -15, -12, 0],
    [0, 30, -12, 0, -1, -1, 0, -12, 30, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];


// nターン先最良位置
function nTurnBestPos(game, n) {
    let subgame = new SubGame();
    let pos = game.PutPosition();
    let turn = game.GetTurn();
    let maxEval = -1000;
    let bestPosition = [];

    for (let i = 0; i < pos.length; i++) {
        subgame.LoadGame(game);
        subgame.PutStone(pos[i]);
        nTurnBestPos_kernel(subgame, n);

        let board = subgame.GetBoard();
        let eval = 0;
        for (let j = 1; j <= 8; j++) {
            for (let k = 1; k <= 8; k++) {
                if (board[j][k] === turn) {
                    eval += weight[j][k];
                } else if (board[j][k] === -turn) {
                    eval -= weight[j][k];
                }
            }
        }

        if (eval > maxEval) {
            maxEval = eval;
            bestPosition.length = 0;
            bestPosition[0] = pos[i];
        } else if (eval === maxEval) {
            bestPosition[bestPosition.length] = pos[i];
        }
    }

    let num = getRandom(0, bestPosition.length);
    return bestPosition[num];
}


// nターン先最良位置のカーネル
function nTurnBestPos_kernel(subgame, n) {
    if (n === 1) {
        return;
    }
    subgame.UpdateGame();
    if (!subgame.GetEnd()) {
        subgame.PutStone(nTurnBestPos(subgame, n - 1));
        nTurnBestPos_kernel(subgame, n - 1);
    }
}


// カスタム
function custom(game, dummy, customCom) {
    let turnNum = game.GetTurnNum();
    let d1 = customCom.division1;
    let d2 = customCom.division2;
    let func, depth;

    if (turnNum <= d1) {
        func = customCom.com1;
        depth = customCom.com1_depth;
        return func(game, depth);
    } else if (turnNum <= d2) {
        func = customCom.com2;
        depth = customCom.com2_depth;
        return func(game, depth);
    } else {
        func = customCom.com3;
        depth = customCom.com3_depth;
        return func(game, depth);
    }
}