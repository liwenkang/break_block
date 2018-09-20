var Scene = function (game) {
    var s = {
        game: game,
    }
    var score = 0
    var paddle = Paddle(game)
    var ball = Ball(game)
    blocks = loadLevel(game, 1)

    game.registerAction("a", function () {
        paddle.moveLeft()
    })

    game.registerAction("d", function () {
        paddle.moveRight()
    })

    game.registerAction("f", function () {
        ball.fire()
    })

    s.draw = function () {
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

    s.update = function () {
        if (paused) {
            return
        }
        ball.move()

        // 判断游戏结束
        if (ball.y > paddle.y) {
            // 跳转到 游戏结束的场景
            var end = SceneEnd.new(game, score)
            game.replaceScene(end)
        }

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

    return s
}
