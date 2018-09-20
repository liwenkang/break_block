class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction("r", function () {
            var end = Scene(game)
            game.replaceScene(end)
        })
    }

    draw() {
        // 在这里加上分数
        this.game.context.fillText(`游戏结束,按 r 重玩`, 10, 240)
    }
}