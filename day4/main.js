var loadLevel = function (game, n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var enableDebugMode = function (game, enable) {
    // 为了 debug 需要 把 pause 和 blocks 改为全局变量
    if (!enable) {
        return
    }
    window.addEventListener("keydown", function (e) {
        var k = e.key
        if (k === "p") {
            // 暂停
            paused = !paused
        } else if ("1234567".includes(k)) {
            // 关卡切换
            blocks = loadLevel(game, Number(k))
        }
    })

    var speedControl = document.querySelector("#id-input-speed")
    speedControl.addEventListener('input', function (e) {
        window.fps = Number(e.target.value)
    })
}

var __main = function () {
    var score = 0
    paused = false

    var images = {
        ball: "ball.png",
        block: "block.png",
        paddle: "paddle.png"
    }

    var game = GuaGame(30, images, function () {
        var paddle = Paddle(game)
        var ball = Ball(game)

        blocks = loadLevel(game, 1)

        // 这里就是 状态更新
        game.registerAction("a", function () {
            paddle.moveLeft()
        })

        game.registerAction("d", function () {
            paddle.moveRight()
        })

        game.registerAction("f", function () {
            ball.fire()
        })

        game.update = function () {
            if (paused) {
                return
            }
            ball.move()
            // ball 和 paddle 相撞
            if (paddle.collide(ball)) {
                // 球反向
                ball.rebound()
            }

            // ball 和 blocks 相撞
            for (var i = 0; i < blocks.length; i++) {
                var block = blocks[i]
                if (block.collide(ball)) {
                    // 砖块被撞了
                    block.kill()
                    score += 100
                    ball.rebound()
                }
            }
        }
        var enableDrag = false
        game.canvas.addEventListener('mousedown', function (e) {
            var x = e.offsetX
            var y = e.offsetY
            if (ball.hasPoint(x, y)) {
                enableDrag = true
            }
        })

        game.canvas.addEventListener('mousemove', function (e) {
            var x = e.offsetX
            var y = e.offsetY
            if (enableDrag) {
                ball.x = x
                ball.y = y
            }
        })

        game.canvas.addEventListener('mouseup', function (e) {
            if (enableDrag) {
                enableDrag = false
            }
        })

        game.draw = function () {
            // 画出背景
            game.context.fillStyle = "gray"
            game.context.fillRect(0, 0, 400, 300)

            game.drawImage(paddle)
            game.drawImage(ball)

            for (var i = 0; i < blocks.length; i++) {
                var block = blocks[i]
                if (block.alive) {
                    // 绘制砖块
                    game.drawImage(block)
                }
            }
            // 在这里加上分数
            game.context.fillText("分数: " + score, 10, 240)
        }
    })

    enableDebugMode(game, true)


}

// 程序的总入口
__main()