// 将球抽象为对象
var Ball = function (game) {
    var o = game.imageByName("ball")
    // 起始位置
    o.x = 100
    o.y = 200
    // 球可以弹
    o.speedX = 5
    o.speedY = 5
    o.fired = false

    o.move = function () {
        if (o.fired) {
            // 与外面相撞 todo 会超出边框
            if (o.x < 0 || o.x > 400) {
                o.speedX = -o.speedX
            }
            if (o.y < 0 || o.y > 300) {
                o.speedY = -o.speedY
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.fire = function () {
        o.fired = true
    }
    o.rebound = function () {
        o.speedY = o.speedY * -1
    }
    return o
}
