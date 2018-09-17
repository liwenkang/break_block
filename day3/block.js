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
        // 高度重叠
        return o.alive && (aInb(ball, o) || aInb(o, ball))
    }
    return o
}
