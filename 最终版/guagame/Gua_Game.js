//瓜
class GuaGame {
	constructor(fps,images,runCallback){
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
		window.addEventListener('keydown',event => {
			this.keydowns[event.key] = true
		})
		window.addEventListener('keyup',function (event) {
			self.keydowns[event.key] = false
		})

		this.init()
	}

	static instance(...args) {
		this.i = this.i || new this(...args)
		return this.i
	}

	drawImage(img) {
		this.context.drawImage(img.image,img.x,img.y)
	}

	//update
	update(){
		this.scene.update()
	}

	//draw
	draw(){
		this.scene.draw()
	}

	registerAction(key, callback){
		this.actions[key] = callback
	}

	runloop(){
		var g = this
		var actions = Object.keys(g.actions)
		for(var i = 0; i < actions.length; i++) {
			var key = actions[i]
			if(g.keydowns[key]) {
				//如果按键被按下,调用注册的action
				g.actions[key]()
			}
		}

		//update
		g.update()
		//clear
		g.context.clearRect(0,0,g.canvas.width,g.canvas.height)
		//draw
		g.draw()

		setTimeout(function () {
			//events
			g.runloop()//相当于使用了递归函数
		}, 1000/window.fps)
	}

	init(){
		 var g = this
		//预先载入所有图片
		var loads = []
		var names = Object.keys(g.images)
		for(var i =0; i < names.length; i++) {
			let name = names[i]
			var path = g.images[name]
			let img = new Image()
			img.src = path
			img.onload = function () {
				//存入g.images中
				g.images[name] = img
				//所有图片载入成功后,才可以运行
				loads.push(1)
				if(loads.length == names.length) {
					g.__start()
				}
			}
		}
	}

	imageByName(name){
		var g = this
		var img = g.images[name]
		var image = {
			w: img.width,
			h: img.height,
			image: img,
		}
		return image
	}

	runWithScene(scene){
		var g = this
		g.scene = scene
		//运行程序
		setTimeout(function(){
			g.runloop()
		}, 1000/fps)
	}
	replaceScene(scene){
		this.scene = scene
	}
	__start(scene){
		this.runCallback(this)
	}
}
