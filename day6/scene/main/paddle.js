// 将挡板抽象为对象
var Paddle = function (game) {
    var o = game.imageByName('paddle')
    // 起始位置
    o.x = 150
    o.y = 230
    // 速度
    o.speed = 5

    o.move = function (x) {
        // x 是它的位置, 这个函数用来限定 o.x 的值在一个范围内
        if (x < 0) {
            x = 0
        }
        if (x > 400 - o.image.width) {
            x = 400 - o.image.width
        }
        o.x = x
    }

    o.moveLeft = function () {
        o.move(o.x - o.speed)
    }

    o.moveRight = function () {
        o.move(o.x + o.speed)
    }
    o.collide = function (ball) {
        // 这里的 o 是 挡板, 判断与球的相撞
        // 高度重叠
        // x1 y1 是挡板左下角坐标
        var x1 = o.x
        var y1 = o.y + o.h
        var x2 = o.x + o.w
        var y2 = o.y

        var x3 = ball.x
        var y3 = ball.y + ball.h
        var x4 = ball.x + ball.w
        var y4 = ball.y

        if (x1 < x4 && x3 < x2 && y1 > y4 && y3 > y2) {
            return true
        } else {
            return false
        }
    }
    return o
}
