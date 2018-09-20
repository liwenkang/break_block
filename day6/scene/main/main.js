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
    paused = false
    var images = {
        ball: "img/ball.png",
        block: "img/block.png",
        paddle: "img/paddle.png"
    }

    var game = new GuaGame(30, images, function (game) {
        var s = SceneTitle.new(game)
        game.runWithScene(s)
    })
    //
    enableDebugMode(game, true)
}

// 程序的总入口
__main()