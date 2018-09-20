class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction("k", function () {
            var start = Scene(game)
            game.replaceScene(start)
        })
    }

    static new(game) {
        var i = new this(game)
        return i
    }

    draw() {
        // 在这里加上分数
        this.game.context.fillText(`按 k 开始游戏`, 10, 240)
    }
}