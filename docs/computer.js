/* m以上n未満のランダムな整数を返す関数 */
function getRandom(m,n){
    return Math.floor(Math.random() * (n - m)) + m;
}


/* ランダム */
function random(game){
    let pos = game.PutPosition();
    let num = getRandom(0, pos.length);
    return pos[num];
}


/* 1ターン先読み */
function oneTurn(game){
    let subgame = new SubGame();
    let pos = game.PutPosition();
    let maxCount = 0;
    let maxPosition = [];

    for(let i=0;i<pos.length;i++){
        subgame.LoadGame(game);
        subgame.PutStone(pos[i]);

        let count = subgame.CountStone(game.GetTurn());
        if(count > maxCount){
            maxCount = count;
            maxPosition.length = 0;
            maxPosition[0] = new Position(pos[i].GetY(),pos[i].GetX());
        }else if(count === maxCount){
            maxPosition[maxPosition.length] = new Position(pos[i].GetY(),pos[i].GetX());
        }
    }

    let num = getRandom(0,maxPosition.length);
    return maxPosition[num];
}