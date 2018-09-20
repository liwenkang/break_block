// 将砖块抽象为对象
var Block = function (game, position) {
    // position 是 [0,0] 格式
    var p = position
    var img = game.imageByName("block")
    // 起始位置
    var o = {
        x: p[0],
        y: p[1],
        w: img.w,
        h: img.h,
        image: img.image,
        alive: true,
        lives: p[2] || 1,
    }
    // 球可以弹

    o.kill = function () {
        o.lives--
        // 没命了,就消失
        if (o.lives <= 0) {
            o.alive = false
        }
    }

    o.collide = function (ball) {
        // 球和砖块相撞

        var x1 = o.x
        var y1 = o.y + o.h
        var x2 = o.x + o.w
        var y2 = o.y

        var x3 = ball.x
        var y3 = ball.y + ball.h
        var x4 = ball.x + ball.w
        var y4 = ball.y

        return o.alive && x1 < x4 && x3 < x2 && y1 > y4 && y3 > y2
    }
    return o
}
