// 这是 start.js 和 end.js 的父类
class GuaScene {
    constructor(game) {
        this.game = game
    }

    static new(game) {
        var i = new this(game)
        return i
    }

    draw() {

    }

    update() {

    }
}