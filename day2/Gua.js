// 抽象 setInterval
window.fps = 30
var GuaGame = function () {
    // g 是对整个游戏画布的抽象
    var canvas = document.querySelector("#id-canvas")
    var context = canvas.getContext("2d")

    var g = {
        canvas: canvas,
        context: context,
        actions: {},
        keydowns: {},
    }

    // draw
    g.drawImage = function (guaImage) {
        g.context.drawImage(guaImage.image, guaImage.x, guaImage.y)
    }

    window.addEventListener("keydown", function (e) {
        // 存储按键状态
        g.keydowns[e.key] = true
    })

    window.addEventListener("keyup", function (e) {
        // 存储按键状态
        g.keydowns[e.key] = false
    })

    // 注册事件到 g.actions 上
    g.registerAction = function (key, callback) {
        g.actions[key] = callback
    }

    // 将原本 setInterval 中的内容,抽为一个函数,并递归调用
    var runloop = function () {
        // 遍历 key ,如果有键被按下了,就去执行它
        var actions = Object.keys(g.actions)

        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
                // 如果按键按下, 调用注册的 action
                g.actions[key]()
            }
        }
        // 随时都在更新状态
        g.update()
        // clear
        context.clearRect(0, 0, canvas.width, canvas.height)
        // draw
        g.draw()
        setTimeout(function () {
            runloop()
        }, 1000 / fps)
    }

    // 定时器
    setTimeout(function () {
        runloop()
    }, 1000 / fps)

    // 定时器
    // setInterval(function () {
    //        // 遍历 key ,如果有键被按下了,就去执行它
    //         var actions = Object.keys(g.actions)
    //
    //         for (var i = 0; i < actions.length; i++) {
    //             var key = actions[i]
    //             if (g.keydowns[key]) {
    //                 // 如果按键按下, 调用注册的 action
    //                 g.actions[key]()
    //             }
    //         }
    //         // 随时都在更新状态
    //         g.update()
    //         // clear
    //         context.clearRect(0, 0, canvas.width, canvas.height)
    //         // draw
    //         g.draw()
    // }, 1000 / fps)
    return g
}
