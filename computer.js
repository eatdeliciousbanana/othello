/* m以上n未満のランダムな整数を返す関数 */
function getRandom(m,n){
    return Math.floor(Math.random() * (n - m)) + m;
}


/* ランダム */
function random(game){
    let position = game.PutPosition();
    let num = getRandom(0, position.length);
    return [position[num][0], position[num][1]];
}


/* 1ターン先読み */
function oneTurn(game){
    let subgame = new SubGame();
    let position = game.PutPosition();
    let maxCount = 0;
    let maxPosition = [];

    for(let i=0;i<position.length;i++){
        subgame.LoadGame(game);
        subgame.PutStone(position[i][0], position[i][1]);

        let count = subgame.CountStone(game.GetTurn());
        if(count > maxCount){
            maxCount = count;
            maxPosition.length = 0;
            maxPosition[0] = [position[i][0], position[i][1]];
        }else if(count === maxCount){
            maxPosition[maxPosition.length] = [position[i][0], position[i][1]];
        }
    }

    let num = getRandom(0,maxPosition.length);
    return [maxPosition[num][0], maxPosition[num][1]];
}