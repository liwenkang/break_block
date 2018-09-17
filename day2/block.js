// 将砖块抽象为对象
var Block = function (position) {
    // position 是 [0,0] 格式
    var p = position
    var image = imageFromPath("block.png")
    var o = {
        image: image,
        // 起始位置
        x: p[0],
        y: p[1],
        // 球可以弹
        w: 20,
        h: 10,
        alive: true,
        lifes: p[2] || 1,
    }
    o.kill = function () {
        o.lifes--
        // 没命了,就消失
        if (o.lifes <= 0) {
            o.alive = false
        }
    }

    o.collide = function (ball) {
        // 高度重叠
        return o.alive && (aInb(ball, o) || aInb(o, ball))
    }
    return o
}
