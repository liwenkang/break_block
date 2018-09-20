var SceneEnd = function (game, score) {
    var s = {
        game: game,
        // game, 和上面相同
    }

    s.draw = function () {
        // 在这里加上分数
        game.context.fillText(`游戏结束 ${score}`, 10, 240)
    }

    s.update = function () {
    }

    return s
}