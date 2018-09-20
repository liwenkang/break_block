class GuaGame {
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback
        //
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.querySelector("#id-canvas")
        this.context = this.canvas.getContext('2d')
//events
        var self = this
        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = true
        })
        window.addEventListener('keyup', function (event) {
            self.keydowns[event.key] = false
        })

        this.init()
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    drawImage(img) {
        this.context.drawImage(img.image, img.x, img.y)
    }

    //update
    update() {
        this.scene.update()
    }

    //draw
    draw() {
        this.scene.draw()
    }

    registerAction(key, callback) {
        this.actions[key] = callback
    }

    runloop() {
        var actions = Object.keys(this.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (this.keydowns[key]) {
                //如果按键被按下,调用注册的action
                this.actions[key]()
            }
        }

        //update
        this.update()
        //clear
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        //draw
        this.draw()

        setTimeout(() => {
            //events
            this.runloop()//相当于使用了递归函数
        }, 1000 / window.fps)
    }

    init() {
        //预先载入所有图片
        var loads = []
        var names = Object.keys(this.images)
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            var path = this.images[name]
            let img = new Image()
            img.src = path
            img.onload = () => {
                //存入g.images中
                this.images[name] = img
                //所有图片载入成功后,才可以运行
                loads.push(1)
                if (loads.length === names.length) {
                    this.__start()
                }
            }
        }
    }

    imageByName(name) {
        var img = this.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }

    runWithScene(scene) {
        this.scene = scene
        //运行程序
        setTimeout(() => {
            this.runloop()
        }, 1000 / fps)
    }

    replaceScene(scene) {
        this.scene = scene
    }

    __start() {
        this.runCallback(this)
    }
}