/* m以上n未満のランダムな整数を返す関数 */
function getRandom(m, n) {
    return Math.floor(Math.random() * (n - m)) + m;
}


/* ランダム */
function random(game) {
    let pos = game.PutPosition();
    let num = getRandom(0, pos.length);
    return pos[num];
}


/* 1ターン先読み */
function oneTurn(game) {
    let subgame = new SubGame();
    let pos = game.PutPosition();
    let maxCount = 0;
    let maxPosition = [];

    for (let i = 0; i < pos.length; i++) {
        subgame.LoadGame(game);
        subgame.PutStone(pos[i]);

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


/* 2ターン先読み */
function twoTurn(game) {
    let subgame = new SubGame();
    let pos = game.PutPosition();
    let maxCount = 0;
    let maxPosition = [];

    for (let i = 0; i < pos.length; i++) {
        subgame.LoadGame(game);
        subgame.PutStone(pos[i]);
        subgame.UpdateGame();
        if (subgame.GetEnd() === false) {
            subgame.PutStone(oneTurn(subgame));
        }

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


/* 3ターン先読み */
function threeTurn(game) {
    let subgame = new SubGame();
    let pos = game.PutPosition();
    let maxCount = 0;
    let maxPosition = [];

    for (let i = 0; i < pos.length; i++) {
        subgame.LoadGame(game);
        subgame.PutStone(pos[i]);
        subgame.UpdateGame();
        if (subgame.GetEnd() === false) {
            subgame.PutStone(twoTurn(subgame));
            subgame.UpdateGame();
            if (subgame.GetEnd() === false) {
                subgame.PutStone(oneTurn(subgame));
            }
        }

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


/* nターン先読み最大 */
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


/* nターン先読み最大のカーネル */
function nTurnMax_kernel(subgame, n) {
    if (n === 1) {
        return;
    }
    subgame.UpdateGame();
    if (subgame.GetEnd() === false) {
        subgame.PutStone(nTurnMax(subgame, n - 1));
        nTurnMax_kernel(subgame, n - 1);
    }
}


/* nターン先読み最小 */
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


/* nターン先読み最小のカーネル */
function nTurnMin_kernel(subgame, n) {
    if (n === 1) {
        return;
    }
    subgame.UpdateGame();
    if (subgame.GetEnd() === false) {
        subgame.PutStone(nTurnMin(subgame, n - 1));
        nTurnMin_kernel(subgame, n - 1);
    }
}