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


/* nターン先読み */
function nTurn(game, n = 1) {
    let subgame = new SubGame();
    let pos = game.PutPosition();
    let maxCount = 0;
    let maxPosition = [];

    for (let i = 0; i < pos.length; i++) {
        subgame.LoadGame(game);
        subgame.PutStone(pos[i]);
        nTurn_kernel(subgame, n);

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


/* nターン先読みのカーネル */
function nTurn_kernel(subgame, n) {
    if (n === 1) {
        return;
    }
    subgame.UpdateGame();
    if (subgame.GetEnd() === false) {
        subgame.PutStone(nTurn(subgame, n - 1));
        nTurn_kernel(subgame, n - 1);
    }
}