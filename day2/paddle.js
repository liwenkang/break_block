// 将挡板抽象为对象
var Paddle = function () {
    var image = imageFromPath("paddle.png")
    var o = {
        image: image,
        // 起始位置
        x: 150,
        y: 280,
        // 速度
        speed: 5,
    }

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
        if (ball.y + ball.image.height > o.y) {
            // 宽度重叠
            if (ball.x >= o.x && ball.x + ball.image.width <= o.x + o.image.width) {
                return true
            }
        }
        return false
    }
    return o
}
