// 抽象 setInterval
window.fps = 30
var GuaGame = function (fps, images, runCallback) {
    // images 是一个对象,里面存放了图片的引用名字以及路径

    // g 是对整个游戏画布的抽象
    var canvas = document.querySelector("#id-canvas")
    var context = canvas.getContext("2d")

    var g = {
        canvas: canvas,
        context: context,
        actions: {},
        keydowns: {},
        images: {}
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
        }, 1000 / window.fps)
    }

    // 在程序开始之前,应该载入所有图片
    // var count = 0
    // var names = Object.keys(images)
    // for (var i = 0; i < names.length; i++) {
    //     let name = names[i]
    //     var path = images[name]
    //     let img = new Image()
    //     img.src = path
    //     img.onload = function () {
    //         g.images[name] = img
    //         count++
    //         if (count === names.length) {
    //             g.run()
    //         }
    //     }
    // }

    // 此处功能同上
    var count = 0
    var allCount = Object.keys(images).length
    for (let key in images) {
        let img = new Image()
        img.src = images[key]
        img.onload = function () {
            // 注意这里的 key
            g.images[key] = img
            count++
            if (count === allCount) {
                g.run()
            }
        }
    }

    g.imageByName = function (name) {
        var img = g.images[name]
        var img = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return img
    }

    // 开始运行程序
    g.run = function () {
        runCallback()
        setTimeout(function () {
            runloop()
        }, 1000 / window.fps)
    }

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
